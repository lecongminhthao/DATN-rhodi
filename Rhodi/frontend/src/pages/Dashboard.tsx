import React, { useState, useEffect, useRef } from 'react';
import BarcodeScannerComponent from "react-qr-barcode-scanner";

import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'react-toastify/dist/ReactToastify.css';

const Dashboard: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [orderProducts, setOrderProducts] = useState<any[]>([]);
  const [showProductList, setShowProductList] = useState<boolean>(false);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const selectedOrderRef = useRef<string | null>(null);
  const cooldownRef = useRef(false);
  const [lastScanned, setLastScanned] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null);
  const [invoicePromotion, setInvoicePromotion] = useState<any | null>(null);

  const fetchOfflineProducts = async () => {
    try {
      const res = await axios.get('http://localhost:3000/employee/offline');
      setProducts(res.data);
    } catch {
      toast.error('Lỗi lấy danh sách sản phẩm');
    }
  };

  const fetchPendingOrders = async () => {
    try {
      const res = await axios.get('http://localhost:3000/employee/orders');
      setOrders(res.data.orders || []);
    } catch {
      toast.error('Lỗi lấy hóa đơn');
    }
  };

  const fetchProductsInOrder = async (orderId: string) => {
    try {
      const res = await axios.get(`http://localhost:3000/employee/orders/${orderId}/products`);
      setOrderProducts(res.data.products);
    } catch {
      toast.error('Lỗi lấy sản phẩm trong hóa đơn');
    }
  };

  const handleSearch = async () => {
    setLoadingSearch(true);
    try {
      const res = await axios.get(`http://localhost:3000/employee/search`, {
        params: { query: searchTerm },
      });
      setProducts(res.data);
    } catch {
      toast.error('❌ Lỗi tìm kiếm sản phẩm');
    } finally {
      setLoadingSearch(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm.trim() === '') {
        fetchOfflineProducts();
      } else {
        handleSearch();
      }
    }, 300);
    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const handleScan = async (err: any, result: any) => {
    if (err || !result || cooldownRef.current) return;

    const barcode = result.text;
    if (!barcode || barcode === lastScanned) return;

    if (!selectedOrderRef.current) {
      toast.warn('⚠️ Vui lòng chọn một hóa đơn');
      return;
    }

    try {
      await axios.post(`http://localhost:3000/employee/orders/add-product`, {
        barcode,
        selectedOrderId: selectedOrderRef.current,
      });

      toast.success('✅ Đã thêm sản phẩm vào hóa đơn');
      setLastScanned(barcode);
      fetchProductsInOrder(selectedOrderRef.current);
      cooldownRef.current = true;
      setTimeout(() => (cooldownRef.current = false), 5000);
    } catch (error) {
      toast.error('❌ Lỗi khi thêm sản phẩm');
    }
  };

  const handleDeleteOrder = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3000/employee/orders/${id}`);
      toast.success('🗑️ Đã xóa hóa đơn');
      fetchPendingOrders();
      if (selectedOrderId === id) {
        setSelectedOrderId(null);
        selectedOrderRef.current = null;
        setOrderProducts([]);
      }
    } catch {
      toast.error('Xoá hóa đơn thất bại');
    }
  };

  const handleSelectOrder = (orderId: string) => {
    setSelectedOrderId(orderId);
    selectedOrderRef.current = orderId;
    setShowProductList(false);
    fetchProductsInOrder(orderId);
    fetchInvoicePromotion(orderId);
  };

  const handleAddProductToOrder = async (productDetailId: string) => {
    if (!selectedOrderRef.current) {
      toast.warn('Chọn hóa đơn trước');
      return;
    }

    try {
      await axios.post(`http://localhost:3000/employee/orders/add-product`, {
        barcode: productDetailId,
        selectedOrderId: selectedOrderRef.current,
      });
      toast.success('✅ Đã thêm sản phẩm vào hóa đơn');
      fetchProductsInOrder(selectedOrderRef.current);
    } catch {
      toast.error('❌ Lỗi thêm sản phẩm');
    }
  };

  const handleRemoveProductFromOrder = async (productDetailId: string) => {
    if (!selectedOrderRef.current) return;

    try {
      await axios.put('http://localhost:3000/employee/orders/removeproduct', {
        orderId: selectedOrderRef.current,
        productDetailId,
      });
      toast.success('🗑️ Đã xóa sản phẩm khỏi hóa đơn');
      fetchProductsInOrder(selectedOrderRef.current);
    } catch (error) {
      toast.error('❌ Lỗi khi xoá sản phẩm');
    }
  };

  const handleUpdateQuantity = async (productDetailId: string, newQuantity: number) => {
    if (!selectedOrderRef.current) return;
    if (newQuantity <= 0) {
      toast.warning('❌ Số lượng phải lớn hơn 0');
      return;
    }

    try {
      await axios.put('http://localhost:3000/employee/orders/updatequantity', {
        orderId: selectedOrderRef.current,
        productDetailId,
        newQuantity,
      });
      toast.success('🔁 Cập nhật số lượng thành công');
      fetchProductsInOrder(selectedOrderRef.current);
    } catch {
      toast.error('❌ Lỗi cập nhật số lượng');
    }
  };

  const fetchInvoicePromotion = async (orderId: String) => {
    try {
      const res = await axios.get(`http://localhost:3000/employee/orders/getpromotionbyOrder`, {
        params: { orderId }
      });

      setInvoicePromotion(res.data);
    } catch {
      toast.error('⚠️ Lỗi lấy khuyến mãi hóa đơn');
      setInvoicePromotion(null);
    }
  };

  const handleConfirmCheckout = async () => {
    if (!selectedOrderId || !selectedPaymentMethod) return;

    try {
      await axios.post(`http://localhost:3000/employee/orders/${selectedOrderId}/checkout`, {
        paymentMethod: selectedPaymentMethod,
        invoicePromotion: invoicePromotion?.eligible
          ? {
              promotionId: invoicePromotion.promotion._id,
              discountRate: invoicePromotion.promotion.discountValue,
              discountAmount: invoicePromotion.discountAmount,
            }
          : null,
      });

      toast.success('💰 Thanh toán thành công!');
      fetchPendingOrders();
      setSelectedOrderId(null);
      selectedOrderRef.current = null;
      setOrderProducts([]);
      setShowPaymentModal(false);
      setSelectedPaymentMethod(null);
    } catch {
      toast.error('❌ Lỗi khi thanh toán');
    }
  };

  useEffect(() => {
    fetchOfflineProducts();
    fetchPendingOrders();
  }, []);

  const totalPrice = orderProducts.reduce((total, p) => total + p.finalPrice, 0);
  const finalTotalPrice =
    invoicePromotion?.eligible && invoicePromotion.discountAmount
      ? totalPrice - invoicePromotion.discountAmount
      : totalPrice;

  return (
    <>
      <ToastContainer />
    </>
  );
};

export default Dashboard;
