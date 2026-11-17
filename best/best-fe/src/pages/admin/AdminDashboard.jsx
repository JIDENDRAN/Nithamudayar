import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Car,
  Package,
  MapPin,
  CalendarCheck,
  Edit,
  Trash2,
  LogOut,
  CheckCircle,
  Clock,
  Trash,
  MessageSquare,
  Settings,
  UserPlus,
  X,
  Plus,
  ChevronRight,
  Phone,
  Mail,
  User,
  Lock,
  Compass,
  Sparkles,
  Info,
  Upload,
  FileText,
  Image as ImageIcon,
  ExternalLink,
  Eye
} from 'lucide-react';
import { getVehicleImage, getPackageImage } from '../../utils/imageImports';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from '../../apiConfig.js';
import TripBillModal from '../../components/admin/TripBillModal';
import { compressImage, getCustomGalleryPhotos, saveCustomGalleryPhoto, deleteCustomGalleryPhoto } from '../../utils/galleryStorage';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('bookings');
  const [toast, setToast] = useState(null);

  // Authenticate
  useEffect(() => {
    const loggedIn = localStorage.getItem('adminLoggedIn');
    if (!loggedIn) {
      navigate('/admin/login');
    }
  }, [navigate]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleImageUpload = async (e, setModalState, fieldName) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('image', file);

    showToast('Uploading image...', 'success');

    try {
      const response = await fetch(`${API_BASE_URL}/api/upload`, {
        method: 'POST',
        body: formData
      });
      if (response.ok) {
        const data = await response.json();
        setModalState(prev => ({
          ...prev,
          data: { ...prev.data, [fieldName]: data.filePath }
        }));
        showToast('Image uploaded successfully!');
      } else {
        showToast('Image upload failed', 'error');
      }
    } catch (error) {
      console.error('Upload error', error);
      showToast('Connection error during upload', 'error');
    }
  };

  // State Management
  const [bookings, setBookings] = useState([]);
  const [cars, setCars] = useState([]);
  const [packages, setPackages] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [settings, setSettings] = useState({ name: '', phone: '', whatsapp: '', password: '' });
  const [whatsappStatus, setWhatsappStatus] = useState({ isConnected: false, qrCode: null });
  const [loadingWhatsapp, setLoadingWhatsapp] = useState(false);
  const [customMsgPhone, setCustomMsgPhone] = useState('');
  const [customMsgText, setCustomMsgText] = useState('');
  const [sendingCustomMsg, setSendingCustomMsg] = useState(false);

  const [loading, setLoading] = useState(true);

  // Modal forms states
  const [carModal, setCarModal] = useState({ isOpen: false, isEdit: false, data: null });
  const [pkgModal, setPkgModal] = useState({ isOpen: false, isEdit: false, data: null });
  const [billModal, setBillModal] = useState({ isOpen: false, booking: null });
  const [newAdmin, setNewAdmin] = useState({ name: '', phone: '', whatsapp: '', password: '' });

  // Gallery Management States
  const [galleryImages, setGalleryImages] = useState([]);
  const [galleryFilter, setGalleryFilter] = useState('all');
  const [galleryModal, setGalleryModal] = useState({
    isOpen: false,
    data: {
      title: '',
      category: 'places',
      location: '',
      badge: 'Featured Photo',
      desc: '',
      image: '',
      span: 'col-span-1 sm:col-span-2 md:col-span-2 row-span-2'
    }
  });
  const [uploadingGalleryImg, setUploadingGalleryImg] = useState(false);
  const [previewLightbox, setPreviewLightbox] = useState(null);

  // Pre-defined values for assets mapping
  const availableCarImages = [
    'sedan_cab-removebg-preview.png',
    'toyota_etios-removebg-preview.png',
    'innova_crysta-removebg-preview.png',
    'suv-removebg-preview.png',
    'tempo_traveller-removebg-preview.png'
  ];

  const availableBgs = [
    'kanyakumari_bg.png',
    'thirumalai_mahal_bg.png',
    'kodaikanal_bg.png',
    'munnar_bg.png',
    'rameswaram_bg.png'
  ];

  const availablePkgImages = [
    'meenakshi_bg.png',
    'rameswaram_bg.png',
    'kodaikanal_bg.png',
    'ooty_bg.png'
  ];

  // Fetch functions
  const fetchBookings = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/bookings`);
      if (res.ok) {
        const data = await res.json();
        setBookings(data);
      }
    } catch (err) {
      console.error(err);
      showToast('Error loading bookings.', 'error');
    }
  };

  const fetchCars = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/cars`);
      if (res.ok) {
        const data = await res.json();
        setCars(data);
      }
    } catch (err) {
      console.error(err);
      showToast('Error loading vehicles.', 'error');
    }
  };

  const fetchPackages = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/packages`);
      if (res.ok) {
        const data = await res.json();
        setPackages(data);
      }
    } catch (err) {
      console.error(err);
      showToast('Error loading packages.', 'error');
    }
  };

  const fetchContacts = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/contacts`);
      if (res.ok) {
        const data = await res.json();
        setContacts(data);
      }
    } catch (err) {
      console.error(err);
      showToast('Error loading contact messages.', 'error');
    }
  };

  const fetchSettings = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/settings`);
      if (res.ok) {
        const data = await res.json();
        if (data) setSettings(data);
      }
    } catch (err) {
      console.error(err);
      showToast('Error loading system settings.', 'error');
    }
  };

  const fetchWhatsappStatus = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/whatsapp-status`);
      if (response.ok) {
        const data = await response.json();
        setWhatsappStatus(data);
      }
    } catch (error) {
      console.error('Failed to fetch WhatsApp status', error);
    }
  };

  const handleWhatsappReconnect = async () => {
    try {
      setLoadingWhatsapp(true);
      const response = await fetch(`${API_BASE_URL}/api/admin/whatsapp-reconnect`, { method: 'POST' });
      if (response.ok) {
        showToast('WhatsApp bot reconnect triggered', 'success');
        setTimeout(fetchWhatsappStatus, 2000);
      } else {
        showToast('Failed to trigger reconnect', 'error');
      }
    } catch (error) {
      showToast('Error reconnecting bot', 'error');
    } finally {
      setLoadingWhatsapp(false);
    }
  };

  const handleWhatsappDisconnect = async () => {
    try {
      setLoadingWhatsapp(true);
      const response = await fetch(`${API_BASE_URL}/api/admin/whatsapp-disconnect`, { method: 'POST' });
      if (response.ok) {
        showToast('WhatsApp bot disconnected successfully', 'success');
        setTimeout(fetchWhatsappStatus, 1000);
      } else {
        showToast('Failed to disconnect bot', 'error');
      }
    } catch (error) {
      showToast('Error disconnecting bot', 'error');
    } finally {
      setLoadingWhatsapp(false);
    }
  };

  const handleWhatsappTest = async () => {
    try {
      setLoadingWhatsapp(true);
      const response = await fetch(`${API_BASE_URL}/api/admin/whatsapp-test`, { method: 'POST' });
      if (response.ok) {
        showToast('Test message sent successfully!', 'success');
      } else {
        showToast('Failed to send test message.', 'error');
      }
    } catch (error) {
      showToast('Error sending test message.', 'error');
    } finally {
      setLoadingWhatsapp(false);
    }
  };

  const handleSendCustomMessage = async () => {
    if (!customMsgPhone.trim() || !customMsgText.trim()) {
      showToast('Please enter both phone number and message', 'error');
      return;
    }
    try {
      setSendingCustomMsg(true);
      const response = await fetch(`${API_BASE_URL}/api/admin/whatsapp-custom-message`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: customMsgPhone, message: customMsgText })
      });
      if (response.ok) {
        showToast('Custom message sent successfully!', 'success');
        setCustomMsgPhone('');
        setCustomMsgText('');
      } else {
        showToast('Failed to send message. Is number registered on WhatsApp?', 'error');
      }
    } catch (error) {
      showToast('Error sending message', 'error');
    } finally {
      setSendingCustomMsg(false);
    }
  };

  // Load all based on active tab
  useEffect(() => {
    setLoading(true);
    const loadData = async () => {
      if (activeTab === 'bookings') await fetchBookings();
      if (activeTab === 'cars') await fetchCars();
      if (activeTab === 'packages') await fetchPackages();
      if (activeTab === 'contacts') await fetchContacts();
      if (activeTab === 'gallery') await fetchGalleryImages();
      if (activeTab === 'settings') await fetchSettings();
      setLoading(false);
    };
    loadData();
  }, [activeTab]);

  useEffect(() => {
    let interval;
    if (activeTab === 'settings') {
      fetchWhatsappStatus();
      interval = setInterval(fetchWhatsappStatus, 5000);
    }
    return () => clearInterval(interval);
  }, [activeTab]);

  // Logout - redirects to home page "/"
  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn');
    localStorage.removeItem('adminUser');
    navigate('/');
  };

  // Bookings Handlers
  const handleStatusUpdate = async (id, newStatus) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/bookings/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (response.ok) {
        setBookings(bookings.map(b => b.id === id ? { ...b, status: newStatus } : b));
        showToast(`Booking status updated to ${newStatus}.`);
      } else {
        showToast('Failed to update booking status.', 'error');
      }
    } catch (err) {
      console.error(err);
      showToast('Connection error.', 'error');
    }
  };

  const handleDeleteBooking = async (id) => {
    if (!window.confirm("Are you sure you want to delete this booking?")) return;
    try {
      const response = await fetch(`${API_BASE_URL}/api/bookings/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        setBookings(bookings.filter(b => b.id !== id));
        showToast('Booking deleted successfully.');
      } else {
        showToast('Failed to delete booking.', 'error');
      }
    } catch (err) {
      console.error(err);
      showToast('Connection error.', 'error');
    }
  };

  // Cars (Fleet) CRUD
  const handleOpenCarModal = (isEdit = false, data = null) => {
    let parsedData = {
      name: '', seats: '4 Seater', ac: 'AC', price: '₹12/km', desc: '', image: availableCarImages[0], bgImage: availableBgs[0],
      outstationRate: '', outstationMinKm: '', outstationDriver: '',
      dayBaseRent: '', dayPerKm: '', dayDriver: ''
    };
    if (data) {
      parsedData = { ...parsedData, ...data };
      if (data.desc) {
        const lines = data.desc.split('\n');
        let currentSection = '';
        lines.forEach(line => {
          if (line.includes('[Outstation Plan]')) currentSection = 'outstation';
          else if (line.includes('[Day Rental Plan]')) currentSection = 'day';
          else if (line.includes(':')) {
            const [k, v] = line.split(':');
            const key = k.trim().toLowerCase();
            const val = v ? v.trim() : '';
            if (currentSection === 'outstation') {
              if (key === 'rate') parsedData.outstationRate = val;
              if (key === 'min distance') parsedData.outstationMinKm = val;
              if (key === 'driver charge') parsedData.outstationDriver = val;
            } else if (currentSection === 'day') {
              if (key === 'base rent') parsedData.dayBaseRent = val;
              if (key === 'per km charge') parsedData.dayPerKm = val;
              if (key === 'driver charge') parsedData.dayDriver = val;
            }
          }
        });
      }
    }
    setCarModal({ isOpen: true, isEdit, data: parsedData });
  };

  const handleCarSubmit = async (e) => {
    e.preventDefault();
    const { isEdit, data } = carModal;

    // Auto format the description string
    const formattedDesc = `[Outstation Plan]
Rate: ${data.outstationRate || ''}
Min Distance: ${data.outstationMinKm || ''}
Driver Charge: ${data.outstationDriver || ''}

[Day Rental Plan]
Base Rent: ${data.dayBaseRent || ''}
Per km Charge: ${data.dayPerKm || ''}
Driver Charge: ${data.dayDriver || ''}`;

    const submissionData = { ...data, desc: formattedDesc };

    const url = isEdit ? `${API_BASE_URL}/api/cars/${submissionData.id}` : `${API_BASE_URL}/api/cars`;
    const method = isEdit ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submissionData)
      });
      if (response.ok) {
        showToast(isEdit ? 'Vehicle updated successfully.' : 'Vehicle added successfully.');
        setCarModal({ isOpen: false, isEdit: false, data: null });
        fetchCars();
      } else {
        showToast('Failed to save vehicle details.', 'error');
      }
    } catch (err) {
      console.error(err);
      showToast('Error saving vehicle details.', 'error');
    }
  };

  const handleDeleteCar = async (id) => {
    if (!window.confirm("Are you sure you want to delete this vehicle?")) return;
    try {
      const response = await fetch(`${API_BASE_URL}/api/cars/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        setCars(cars.filter(c => c.id !== id));
        showToast('Vehicle removed from fleet.');
      } else {
        showToast('Failed to delete vehicle.', 'error');
      }
    } catch (err) {
      console.error(err);
      showToast('Connection error.', 'error');
    }
  };

  // Packages CRUD
  const handleOpenPkgModal = (isEdit = false, data = null) => {
    setPkgModal({
      isOpen: true,
      isEdit,
      data: data ? { ...data } : { name: '', duration: '', places: '', price: '', image: availablePkgImages[0] }
    });
  };

  const handlePkgSubmit = async (e) => {
    e.preventDefault();
    const { isEdit, data } = pkgModal;
    const url = isEdit ? `${API_BASE_URL}/api/packages/${data.id}` : `${API_BASE_URL}/api/packages`;
    const method = isEdit ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (response.ok) {
        showToast(isEdit ? 'Package updated successfully.' : 'Package added successfully.');
        setPkgModal({ isOpen: false, isEdit: false, data: null });
        fetchPackages();
      } else {
        showToast('Failed to save package.', 'error');
      }
    } catch (err) {
      console.error(err);
      showToast('Error saving package.', 'error');
    }
  };

  const handleDeletePackage = async (id) => {
    if (!window.confirm("Are you sure you want to delete this package?")) return;
    try {
      const response = await fetch(`${API_BASE_URL}/api/packages/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        setPackages(packages.filter(p => p.id !== id));
        showToast('Package deleted successfully.');
      } else {
        showToast('Failed to delete package.', 'error');
      }
    } catch (err) {
      console.error(err);
      showToast('Connection error.', 'error');
    }
  };

  // Contact Us message delete
  const handleDeleteContact = async (id) => {
    if (!window.confirm("Are you sure you want to delete this message?")) return;
    try {
      const response = await fetch(`${API_BASE_URL}/api/contacts/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        setContacts(contacts.filter(c => c.id !== id));
        showToast('Message deleted successfully.');
      } else {
        showToast('Failed to delete message.', 'error');
      }
    } catch (err) {
      console.error(err);
      showToast('Connection error.', 'error');
    }
  };

  // Settings Handlers
  const handleSettingsSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/settings`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      });
      if (response.ok) {
        showToast('Admin settings saved successfully.');
      } else {
        showToast('Failed to save admin settings.', 'error');
      }
    } catch (err) {
      console.error(err);
      showToast('Connection error.', 'error');
    }
  };

  // Add Admin Handler
  const handleAddAdminSubmit = async (e) => {
    e.preventDefault();
    if (!newAdmin.name || !newAdmin.password) {
      showToast('Name and password are required.', 'error');
      return;
    }
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newAdmin)
      });
      if (response.ok) {
        showToast('Additional administrator registered successfully.');
        setNewAdmin({ name: '', phone: '', whatsapp: '', password: '' });
      } else {
        showToast('Failed to register new administrator.', 'error');
      }
    } catch (err) {
      console.error(err);
      showToast('Connection error.', 'error');
    }
  };

  // Gallery Handlers
  const getGalleryImageUrl = (img) => {
    if (!img) return '';
    if (img.startsWith('http://') || img.startsWith('https://') || img.startsWith('data:')) {
      return img;
    }
    if (img.startsWith('/uploads')) {
      return `${API_BASE_URL}${img}`;
    }
    return img;
  };

  const fetchGalleryImages = async () => {
    try {
      const photos = await getCustomGalleryPhotos();
      setGalleryImages(photos);
    } catch (err) {
      console.warn('Gallery load notice:', err);
    }
  };

  const handleGalleryImageUpload = async (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    setUploadingGalleryImg(true);
    showToast('Optimizing & preparing image...', 'success');

    try {
      // 1. Client-side auto-compression to avoid browser quota limits
      const compressedDataUri = await compressImage(file, { maxWidth: 1600, maxHeight: 1600, quality: 0.82 });

      // Suggest clean title from filename if title empty
      const fileNameClean = file.name ? file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ') : '';

      setGalleryModal(prev => ({
        ...prev,
        data: {
          ...prev.data,
          image: compressedDataUri,
          title: prev.data.title || fileNameClean
        }
      }));

      // 2. Also try uploading to backend server if reachable
      try {
        const formData = new FormData();
        formData.append('image', file);
        const response = await fetch(`${API_BASE_URL}/api/upload`, {
          method: 'POST',
          body: formData
        });
        if (response.ok) {
          const resData = await response.json();
          if (resData.filePath) {
            setGalleryModal(prev => ({
              ...prev,
              data: { ...prev.data, image: resData.filePath }
            }));
          }
        }
      } catch (beErr) {
        // Backend offline / static mode - compressedDataUri is active
      }

      showToast('Image ready to publish!');
    } catch (err) {
      console.error('Image compression error:', err);
      showToast('Failed to process image file', 'error');
    } finally {
      setUploadingGalleryImg(false);
      if (e.target) e.target.value = '';
    }
  };

  const handleGallerySubmit = async (e) => {
    e.preventDefault();
    const { data } = galleryModal;

    if (!data.image) {
      showToast('Please upload or select an image for the gallery', 'error');
      return;
    }

    const finalTitle = data.title.trim() || 'Tour Highlight - Tamil Nadu';

    const newPhoto = {
      id: Date.now(),
      title: finalTitle,
      category: data.category || 'places',
      location: data.location.trim() || 'Tamil Nadu',
      badge: data.badge.trim() || 'Featured Photo',
      desc: data.desc.trim() || '',
      image: data.image,
      span: data.span || 'col-span-1 sm:col-span-2 md:col-span-2 row-span-2',
      createdAt: new Date().toISOString()
    };

    try {
      await saveCustomGalleryPhoto(newPhoto);
      setGalleryImages(prev => [newPhoto, ...prev.filter(g => g.id !== newPhoto.id)]);
      showToast('Photo successfully added to public gallery!');
      setGalleryModal({
        isOpen: false,
        data: {
          title: '',
          category: 'places',
          location: '',
          badge: 'Featured Photo',
          desc: '',
          image: '',
          span: 'col-span-1 sm:col-span-2 md:col-span-2 row-span-2'
        }
      });
    } catch (err) {
      console.error('Gallery save error:', err);
      showToast('Error saving photo: ' + (err.message || 'unknown error'), 'error');
    }
  };

  const handleDeleteGalleryImage = async (id) => {
    if (!window.confirm('Are you sure you want to remove this photo from the public gallery?')) return;
    try {
      await deleteCustomGalleryPhoto(id);
      setGalleryImages(prev => prev.filter(g => g.id !== id));
      showToast('Photo removed from gallery.');
    } catch (err) {
      console.error('Delete error:', err);
      showToast('Failed to delete photo', 'error');
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f0e8] text-gray-800 flex flex-col md:flex-row font-outfit">

      {/* Sidebar navigation */}
      <div className="w-full md:w-64 bg-[#10194E] flex flex-col border-r border-[#252c54] shadow-2xl z-20">
        <div className="p-6 flex items-center gap-3 border-b border-[#252c54]">
          <div className="w-12 h-12 bg-[#10194E] rounded-xl flex items-center justify-center shadow-md p-0.5 overflow-hidden">
            <img src="/logo.png" alt="Nithamudayar Tours & Travels Pvt Ltd" className="w-full h-full object-contain" />
          </div>
          <div>
            <h2 className="font-bold text-lg leading-tight text-white font-heading">Nithamudayar</h2>
            <p className="text-xs text-[#D4AF37] font-medium tracking-wide">Control Center</p>
          </div>
        </div>

        <nav className="flex-grow py-6">
          <ul className="space-y-2 px-4">
            <li>
              <button
                onClick={() => setActiveTab('bookings')}
                className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all font-medium ${activeTab === 'bookings'
                  ? 'bg-[#d4951e] text-white font-bold shadow-md'
                  : 'text-[#a3b8b1] hover:text-white hover:bg-[#283058]'
                  }`}
              >
                <CalendarCheck className="w-5 h-5" /> Manage Bookings
              </button>
            </li>

            <li>
              <button
                onClick={() => setActiveTab('cars')}
                className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all font-medium ${activeTab === 'cars'
                  ? 'bg-[#d4951e] text-white font-bold shadow-md'
                  : 'text-[#a3b8b1] hover:text-white hover:bg-[#283058]'
                  }`}
              >
                <Car className="w-5 h-5" /> Manage Vehicles
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('packages')}
                className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all font-medium ${activeTab === 'packages'
                  ? 'bg-[#d4951e] text-white font-bold shadow-md'
                  : 'text-[#a3b8b1] hover:text-white hover:bg-[#283058]'
                  }`}
              >
                <Package className="w-5 h-5" /> Manage Packages
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('gallery')}
                className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all font-medium ${activeTab === 'gallery'
                  ? 'bg-[#d4951e] text-white font-bold shadow-md'
                  : 'text-[#a3b8b1] hover:text-white hover:bg-[#283058]'
                  }`}
              >
                <ImageIcon className="w-5 h-5" /> Manage Gallery
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('contacts')}
                className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all font-medium ${activeTab === 'contacts'
                  ? 'bg-[#d4951e] text-white font-bold shadow-md'
                  : 'text-[#a3b8b1] hover:text-white hover:bg-[#283058]'
                  }`}
              >
                <MessageSquare className="w-5 h-5" /> Contact Queries
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('settings')}
                className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all font-medium ${activeTab === 'settings'
                  ? 'bg-[#d4951e] text-white font-bold shadow-md'
                  : 'text-[#a3b8b1] hover:text-white hover:bg-[#283058]'
                  }`}
              >
                <Settings className="w-5 h-5" /> Admin Settings
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('add-admin')}
                className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all font-medium ${activeTab === 'add-admin'
                  ? 'bg-[#d4951e] text-white font-bold shadow-md'
                  : 'text-[#a3b8b1] hover:text-white hover:bg-[#283058]'
                  }`}
              >
                <UserPlus className="w-5 h-5" /> Add Administrator
              </button>
            </li>
          </ul>
        </nav>

        <div className="p-4 border-t border-[#283058]">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-3.5 bg-red-500/10 text-red-300 hover:bg-red-500 hover:text-white rounded-xl transition-all font-bold text-sm shadow-sm"
          >
            <LogOut className="w-4 h-4" /> Logout Admin
          </button>
        </div>
      </div>

      {/* Toast notifications */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className={`fixed bottom-6 right-6 z-50 px-6 py-4 rounded-xl shadow-2xl font-bold flex items-center gap-3 ${toast.type === 'error' ? 'bg-red-600 text-white' : 'bg-green-600 text-white'
              }`}
          >
            {toast.type === 'error' ? <Trash2 className="w-5 h-5" /> : <CheckCircle className="w-5 h-5" />}
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main dashboard content view */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#f5f0e8] text-gray-800">

        <header className="bg-white border-b border-[#edeae1] px-6 py-4 md:px-8 flex justify-between items-center shadow-sm relative z-10">
          <h1 className="text-xl md:text-2xl font-bold text-[#252c54] uppercase tracking-wider flex items-center gap-2 font-heading">
            <span className="text-[#D4AF37]">●</span> {activeTab.replace('-', ' ')}
          </h1>
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <span className="block text-sm font-semibold text-[#252c54]">Superadmin Panel</span>
              <span className="block text-xs text-[#D4AF37] font-medium tracking-wide">Nithamudayar Tours & Travels Pvt Ltd</span>
            </div>
            <div className="w-12 h-12 bg-[#10194E] rounded-xl p-0.5 shadow-md flex items-center justify-center shrink-0">
              <img
                src="/logo.png"
                alt="Nithamudayar Emblem"
                className="w-full h-full object-contain rounded-lg"
              />
            </div>
          </div>
        </header>

        <main className="flex-grow p-6 md:p-8 overflow-y-auto">
          <AnimatePresence mode="wait">

            {/* BOOKINGS VIEW */}
            {activeTab === 'bookings' && (
              <motion.div key="bookings" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }}>
                <div className="bg-white rounded-3xl border border-[#edeae1] shadow-[0_8px_30px_rgb(0,0,0,0.06)] overflow-hidden">
                  <div className="p-6 border-b border-[#edeae1] flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                    <div>
                      <h2 className="text-xl font-bold text-[#10194E]">Customer Bookings</h2>
                      <p className="text-xs text-gray-500 mt-0.5">Manage customer reservations and generate official trip bills</p>
                    </div>
                    <button
                      onClick={() => setBillModal({ isOpen: true, booking: null })}
                      className="bg-[#10194E] hover:bg-[#283058] text-white px-4 py-2.5 rounded-xl flex items-center justify-center gap-2 font-bold text-xs uppercase tracking-wider shadow-sm transition-all cursor-pointer self-start sm:self-auto"
                    >
                      <FileText className="w-4 h-4 text-[#d4951e]" />
                      <span>Create Trip Bill / PDF</span>
                    </button>
                  </div>

                  {loading ? (
                    <div className="flex flex-col items-center justify-center py-20 text-gray-500 font-medium">
                      <div className="w-10 h-10 border-4 border-[#d4951e] border-t-transparent rounded-full animate-spin mb-4"></div>
                      Loading bookings from database...
                    </div>
                  ) : bookings.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                      <CalendarCheck className="w-16 h-16 mb-4 text-gray-300" />
                      <p className="text-lg font-bold text-gray-800">No Bookings Found</p>
                      <p className="text-sm text-gray-500 mt-1">Bookings submitted from the site show up automatically.</p>
                    </div>
                  ) : (
                    <>
                      {/* Desktop Table View */}
                      <div className="hidden md:block overflow-x-auto">
                        <table className="w-full text-left border-collapse min-w-[900px]">
                          <thead>
                            <tr className="bg-[#f7f5f0] border-b border-[#edeae1] text-gray-500 text-xs uppercase tracking-wider font-bold">
                              <th className="px-6 py-4">Booking ID</th>
                              <th className="px-6 py-4">Customer Details</th>
                              <th className="px-6 py-4">Route (Start → End)</th>
                              <th className="px-6 py-4">Date & Time</th>
                              <th className="px-6 py-4">Vehicle / Package</th>
                              <th className="px-6 py-4">Status</th>
                              <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-[#edeae1] text-sm">
                            {bookings.map(booking => (
                              <tr key={booking.id} className="hover:bg-[#f7f5f0]/50 transition-colors">
                                <td className="px-6 py-4 font-mono font-bold text-xs text-[#10194E]">
                                  BKG-{String(booking.id).padStart(4, '0')}
                                </td>
                                <td className="px-6 py-4">
                                  <div className="font-bold text-gray-800">{booking.name}</div>
                                  <div className="text-xs text-gray-500 font-medium">{booking.phone}</div>
                                </td>
                                <td className="px-6 py-4 max-w-[260px]">
                                  <div className="text-xs truncate text-gray-700 font-medium" title={booking.fromLocation}>
                                    <span className="text-[#10194E] mr-1.5 font-bold">●</span>{booking.fromLocation}
                                  </div>
                                  <div className="text-xs truncate text-gray-700 mt-1.5 font-medium" title={booking.toLocation}>
                                    <span className="text-[#d4951e] mr-1.5 font-bold">●</span>{booking.toLocation}
                                  </div>
                                </td>
                                <td className="px-6 py-4">
                                  <div className="font-semibold text-gray-800">{booking.date}</div>
                                  <div className="text-xs text-gray-500 font-medium">{booking.time || 'Not specified'}</div>
                                </td>
                                <td className="px-6 py-4">
                                  <div className="font-semibold text-[#10194E]">{booking.vehicle || 'Not Selected'}</div>
                                  <div className="text-xs text-gray-500 italic">{booking.packageType || 'Custom Trip'}</div>
                                </td>
                                <td className="px-6 py-4">
                                  <span className={`px-3 py-1.5 rounded-full text-xs font-bold ${booking.status === 'Approved'
                                    ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                                    : booking.status === 'Completed'
                                      ? 'bg-blue-100 text-blue-700 border border-blue-200'
                                      : 'bg-amber-100 text-amber-700 border border-amber-200'
                                    }`}>
                                    {booking.status || 'Pending'}
                                  </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                  <div className="flex gap-2 justify-end items-center">
                                    <button
                                      onClick={() => setBillModal({ isOpen: true, booking })}
                                      className="bg-[#10194E] hover:bg-[#283058] text-white px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                                      title="Generate Trip Bill / PDF"
                                    >
                                      <FileText className="w-3.5 h-3.5 text-[#d4951e]" />
                                      <span>Bill</span>
                                    </button>
                                    <select
                                      value={booking.status || 'Pending'}
                                      onChange={(e) => handleStatusUpdate(booking.id, e.target.value)}
                                      className="bg-gray-50 text-gray-700 hover:bg-gray-100 font-medium text-xs px-2 py-1.5 rounded-lg border border-gray-200 outline-none transition-all shadow-sm focus:ring-1 focus:ring-[#10194E] cursor-pointer"
                                    >
                                      <option value="Pending">Pending</option>
                                      <option value="Approved">Approved</option>
                                      <option value="Completed">Completed</option>
                                    </select>
                                    <button
                                      onClick={() => handleDeleteBooking(booking.id)}
                                      className="bg-red-50 text-red-500 hover:bg-red-500 hover:text-white p-2 rounded-lg border border-red-100 transition-all shadow-sm"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {/* Mobile Cards View (Visible on Phones & Small Screens) */}
                      <div className="md:hidden divide-y divide-[#edeae1]">
                        {bookings.map(booking => (
                          <div key={booking.id} className="p-4 space-y-3 hover:bg-[#faf8f5]/60 transition-colors">
                            <div className="flex items-center justify-between">
                              <span className="font-mono font-bold text-xs text-[#10194E] bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded">
                                BKG-{String(booking.id).padStart(4, '0')}
                              </span>
                              <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${booking.status === 'Approved' ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' :
                                  booking.status === 'Completed' ? 'bg-blue-100 text-blue-700 border border-blue-200' : 'bg-amber-100 text-amber-700 border border-amber-200'
                                }`}>
                                {booking.status || 'Pending'}
                              </span>
                            </div>

                            <div>
                              <div className="font-bold text-gray-900 text-sm">{booking.name}</div>
                              <div className="text-xs text-gray-500 font-medium">{booking.phone}</div>
                            </div>

                            <div className="bg-[#f7f5f0] p-2.5 rounded-xl text-xs space-y-1">
                              <div className="truncate"><span className="text-[#10194E] font-bold mr-1.5">● From:</span>{booking.fromLocation}</div>
                              <div className="truncate"><span className="text-[#d4951e] font-bold mr-1.5">● To:</span>{booking.toLocation}</div>
                            </div>

                            <div className="flex justify-between items-center text-xs text-gray-600 pt-0.5">
                              <div><span className="font-semibold">{booking.date}</span> {booking.time ? `• ${booking.time}` : ''}</div>
                              <div className="font-bold text-[#10194E]">{booking.vehicle || 'Standard'}</div>
                            </div>

                            <div className="flex items-center justify-between gap-2 pt-1.5">
                              <button
                                onClick={() => setBillModal({ isOpen: true, booking })}
                                className="flex-1 bg-[#10194E] hover:bg-[#283058] text-white py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm active:scale-98 transition-all"
                              >
                                <FileText className="w-3.5 h-3.5 text-[#d4951e]" />
                                <span>Create Bill</span>
                              </button>

                              <select
                                value={booking.status || 'Pending'}
                                onChange={(e) => handleStatusUpdate(booking.id, e.target.value)}
                                className="bg-gray-50 text-gray-700 font-medium text-xs px-2.5 py-2 rounded-lg border border-gray-200"
                              >
                                <option value="Pending">Pending</option>
                                <option value="Approved">Approved</option>
                                <option value="Completed">Completed</option>
                              </select>

                              <button
                                onClick={() => handleDeleteBooking(booking.id)}
                                className="bg-red-50 text-red-500 hover:bg-red-500 hover:text-white p-2 rounded-lg border border-red-100"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </motion.div>
            )}

            {/* GALLERY MANAGEMENT VIEW */}
            {activeTab === 'gallery' && (
              <motion.div key="gallery" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }}>
                <div className="bg-white rounded-3xl border border-[#edeae1] shadow-[0_8px_30px_rgb(0,0,0,0.06)] overflow-hidden">
                  
                  {/* Header Bar */}
                  <div className="p-6 border-b border-[#edeae1] flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-xl font-bold text-[#10194E] font-heading">Gallery Management</h2>
                        <span className="bg-[#10194E]/10 text-[#10194E] text-xs font-bold px-2.5 py-0.5 rounded-full">
                          {galleryImages.length} Uploaded
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Upload custom photos to instantly showcase them on the public <span className="font-semibold text-[#10194E]">/gallery</span> page.
                      </p>
                    </div>

                    <div className="flex items-center gap-3 self-stretch sm:self-auto">
                      <a
                        href="/gallery"
                        target="_blank"
                        rel="noreferrer"
                        className="px-4 py-2 rounded-xl border border-gray-300 text-gray-700 hover:text-[#10194E] hover:border-[#10194E] font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm"
                      >
                        <span>View Live Gallery</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                      <button
                        onClick={() => setGalleryModal({
                          isOpen: true,
                          data: {
                            title: '',
                            category: 'places',
                            location: '',
                            badge: 'Featured Photo',
                            desc: '',
                            image: '',
                            span: 'col-span-1 sm:col-span-2 md:col-span-2 row-span-2'
                          }
                        })}
                        className="bg-[#d4951e] hover:bg-[#b57a15] text-white px-4 py-2 rounded-xl flex items-center gap-2 font-bold text-sm shadow-md transition-all cursor-pointer"
                      >
                        <Plus className="w-4 h-4" /> Upload New Photo
                      </button>
                    </div>
                  </div>

                  {/* Filter Pills */}
                  <div className="px-6 py-3.5 bg-[#FAF8F5] border-b border-[#edeae1] flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold text-gray-500 mr-2 uppercase tracking-wider">Filter Section:</span>
                    {[
                      { id: 'all', label: 'All Photos', count: galleryImages.length },
                      { id: 'places', label: 'Places & Temples', count: galleryImages.filter(g => (g.category || 'places') === 'places').length },
                      { id: 'cars', label: 'Our Fleet', count: galleryImages.filter(g => g.category === 'cars').length },
                      { id: 'clients', label: 'Happy Clients', count: galleryImages.filter(g => g.category === 'clients').length }
                    ].map(tab => (
                      <button
                        key={tab.id}
                        onClick={() => setGalleryFilter(tab.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          galleryFilter === tab.id
                            ? 'bg-[#10194E] text-white shadow-sm'
                            : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                        }`}
                      >
                        {tab.label} ({tab.count})
                      </button>
                    ))}
                  </div>

                  {/* Content List */}
                  {loading ? (
                    <div className="flex flex-col items-center justify-center py-20 text-gray-500 font-medium">
                      <div className="w-10 h-10 border-4 border-[#d4951e] border-t-transparent rounded-full animate-spin mb-4" />
                      Loading gallery photos...
                    </div>
                  ) : galleryImages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
                      <div className="w-20 h-20 bg-[#d4951e]/10 text-[#d4951e] rounded-full flex items-center justify-center mb-4 shadow-inner">
                        <ImageIcon className="w-10 h-10" />
                      </div>
                      <h3 className="text-lg font-bold text-[#10194E]">No Custom Photos Uploaded Yet</h3>
                      <p className="text-sm text-gray-500 max-w-md mt-1 mb-6">
                        The public gallery currently displays all 48 default heritage destinations, client memories, and fleet cars. Click below to upload your own photos to feature at the top!
                      </p>
                      <button
                        onClick={() => setGalleryModal({
                          isOpen: true,
                          data: {
                            title: '',
                            category: 'places',
                            location: '',
                            badge: 'Featured Photo',
                            desc: '',
                            image: '',
                            span: 'col-span-1 sm:col-span-2 md:col-span-2 row-span-2'
                          }
                        })}
                        className="bg-[#10194E] hover:bg-[#283058] text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-md flex items-center gap-2 transition-all cursor-pointer"
                      >
                        <Upload className="w-4 h-4" /> Upload First Photo
                      </button>
                    </div>
                  ) : (
                    <div className="p-6">
                      {galleryImages.filter(g => galleryFilter === 'all' || (g.category || 'places') === galleryFilter).length === 0 ? (
                        <div className="text-center py-12 text-gray-400">
                          <p className="text-sm font-semibold">No photos found in this category.</p>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                          {galleryImages
                            .filter(g => galleryFilter === 'all' || (g.category || 'places') === galleryFilter)
                            .map((item) => {
                              const imgUrl = getGalleryImageUrl(item.image);
                              const catColors = {
                                places: 'bg-emerald-100 text-emerald-800 border-emerald-200',
                                cars: 'bg-blue-100 text-blue-800 border-blue-200',
                                clients: 'bg-amber-100 text-amber-800 border-amber-200'
                              };
                              const catLabels = {
                                places: 'Places & Temples',
                                cars: 'Fleet / Vehicles',
                                clients: 'Clients & Memoirs'
                              };

                              return (
                                <div
                                  key={item.id}
                                  className="group border border-[#edeae1] rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 bg-white flex flex-col justify-between"
                                >
                                  <div>
                                    {/* Image Thumbnail with Overlay preview */}
                                    <div className="relative h-48 bg-gray-900 overflow-hidden cursor-pointer" onClick={() => setPreviewLightbox(item)}>
                                      <img
                                        src={imgUrl}
                                        alt={item.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                      />
                                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                        <span className="bg-white/90 text-[#10194E] px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 shadow-md">
                                          <Eye className="w-3.5 h-3.5" /> Preview
                                        </span>
                                      </div>
                                      <div className="absolute top-2.5 left-2.5">
                                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border shadow-sm ${catColors[item.category] || catColors.places}`}>
                                          {catLabels[item.category] || 'Places'}
                                        </span>
                                      </div>
                                      {item.badge && (
                                        <div className="absolute bottom-2.5 left-2.5">
                                          <span className="text-[10px] font-bold bg-[#10194E]/90 text-[#D4AF37] px-2 py-0.5 rounded-md backdrop-blur-sm border border-[#D4AF37]/30">
                                            {item.badge}
                                          </span>
                                        </div>
                                      )}
                                    </div>

                                    {/* Card Content */}
                                    <div className="p-4 space-y-2">
                                      <h3 className="font-bold text-base text-[#10194E] line-clamp-1 group-hover:text-[#d4951e] transition-colors">
                                        {item.title}
                                      </h3>
                                      <div className="flex items-center gap-1.5 text-xs text-gray-500">
                                        <MapPin className="w-3.5 h-3.5 text-[#d4951e] shrink-0" />
                                        <span className="truncate font-medium">{item.location || 'Tamil Nadu'}</span>
                                      </div>
                                      {item.desc && (
                                        <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                                          {item.desc}
                                        </p>
                                      )}
                                    </div>
                                  </div>

                                  {/* Card Footer Actions */}
                                  <div className="px-4 py-3 bg-[#FAF8F5] border-t border-[#edeae1] flex items-center justify-between text-xs">
                                    <span className="text-[11px] text-gray-400 font-medium">
                                      {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'Active'}
                                    </span>
                                    <button
                                      onClick={() => handleDeleteGalleryImage(item.id)}
                                      className="text-red-500 hover:text-red-700 hover:bg-red-50 px-2.5 py-1 rounded-lg font-bold flex items-center gap-1 transition-all cursor-pointer"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" /> Delete
                                    </button>
                                  </div>
                                </div>
                              );
                            })}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            )}



            {/* CARS VIEW */}
            {activeTab === 'cars' && (
              <motion.div key="cars" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }}>
                <div className="bg-white rounded-3xl border border-[#edeae1] shadow-[0_8px_30px_rgb(0,0,0,0.06)] overflow-hidden">
                  <div className="p-6 border-b border-[#edeae1] flex justify-between items-center">
                    <h2 className="text-xl font-bold text-[#10194E]">Fleet Management</h2>
                    <button
                      onClick={() => handleOpenCarModal(false)}
                      className="bg-[#d4951e] hover:bg-[#b57a15] text-white px-4 py-2 rounded-xl flex items-center gap-2 font-bold text-sm shadow-md transition-all"
                    >
                      <Plus className="w-4 h-4" /> Add Vehicle
                    </button>
                  </div>
                  {loading ? (
                    <div className="flex flex-col items-center justify-center py-20 text-gray-500 font-medium">
                      <div className="w-10 h-10 border-4 border-[#d4951e] border-t-transparent rounded-full animate-spin mb-4"></div>
                      Loading vehicles...
                    </div>
                  ) : cars.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                      <Car className="w-16 h-16 mb-4 text-gray-300" />
                      <p className="text-lg font-bold text-gray-800">No Vehicles Found</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 p-6">
                      {cars.map(car => (
                        <div key={car.id} className="border border-[#edeae1] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all">
                          <div className="h-40 bg-gray-100 relative">
                            <img src={getVehicleImage(car.image)} alt={car.name} className="w-full h-full object-contain absolute inset-0" />
                          </div>
                          <div className="p-4">
                            <h3 className="font-bold text-lg text-[#10194E] truncate">{car.name}</h3>
                            <div className="flex items-center gap-2 mt-1 text-xs font-semibold text-gray-500">
                              <span className="bg-gray-100 px-2 py-1 rounded-md">{car.seats}</span>
                              <span className="bg-gray-100 px-2 py-1 rounded-md">{car.ac}</span>
                              <span className="bg-gray-100 px-2 py-1 rounded-md text-[#d4951e]">{car.price}</span>
                            </div>
                            <div className="mt-4 flex justify-between items-center pt-3 border-t border-[#edeae1]">
                              <button onClick={() => handleOpenCarModal(true, car)} className="text-[#10194E] hover:text-[#d4951e] font-bold text-sm flex items-center gap-1">
                                <Edit className="w-4 h-4" /> Edit
                              </button>
                              <button onClick={() => handleDeleteCar(car.id)} className="text-red-500 hover:text-red-600 font-bold text-sm flex items-center gap-1">
                                <Trash2 className="w-4 h-4" /> Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* GALLERY MANAGEMENT VIEW */}
            {activeTab === 'gallery' && (
              <motion.div key="gallery" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }}>
                <div className="bg-white rounded-3xl border border-[#edeae1] shadow-[0_8px_30px_rgb(0,0,0,0.06)] overflow-hidden">
                  
                  {/* Header Bar */}
                  <div className="p-6 border-b border-[#edeae1] flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-xl font-bold text-[#10194E] font-heading">Gallery Management</h2>
                        <span className="bg-[#10194E]/10 text-[#10194E] text-xs font-bold px-2.5 py-0.5 rounded-full">
                          {galleryImages.length} Uploaded
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Upload custom photos to instantly showcase them on the public <span className="font-semibold text-[#10194E]">/gallery</span> page.
                      </p>
                    </div>

                    <div className="flex items-center gap-3 self-stretch sm:self-auto">
                      <a
                        href="/gallery"
                        target="_blank"
                        rel="noreferrer"
                        className="px-4 py-2 rounded-xl border border-gray-300 text-gray-700 hover:text-[#10194E] hover:border-[#10194E] font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm"
                      >
                        <span>View Live Gallery</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                      <button
                        onClick={() => setGalleryModal({
                          isOpen: true,
                          data: {
                            title: '',
                            category: 'places',
                            location: '',
                            badge: 'Featured Photo',
                            desc: '',
                            image: '',
                            span: 'col-span-1 sm:col-span-2 md:col-span-2 row-span-2'
                          }
                        })}
                        className="bg-[#d4951e] hover:bg-[#b57a15] text-white px-4 py-2 rounded-xl flex items-center gap-2 font-bold text-sm shadow-md transition-all cursor-pointer"
                      >
                        <Plus className="w-4 h-4" /> Upload New Photo
                      </button>
                    </div>
                  </div>

                  {/* Filter Pills */}
                  <div className="px-6 py-3.5 bg-[#FAF8F5] border-b border-[#edeae1] flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold text-gray-500 mr-2 uppercase tracking-wider">Filter Section:</span>
                    {[
                      { id: 'all', label: 'All Photos', count: galleryImages.length },
                      { id: 'places', label: 'Places & Temples', count: galleryImages.filter(g => (g.category || 'places') === 'places').length },
                      { id: 'cars', label: 'Our Fleet', count: galleryImages.filter(g => g.category === 'cars').length },
                      { id: 'clients', label: 'Happy Clients', count: galleryImages.filter(g => g.category === 'clients').length }
                    ].map(tab => (
                      <button
                        key={tab.id}
                        onClick={() => setGalleryFilter(tab.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          galleryFilter === tab.id
                            ? 'bg-[#10194E] text-white shadow-sm'
                            : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                        }`}
                      >
                        {tab.label} ({tab.count})
                      </button>
                    ))}
                  </div>

                  {/* Content List */}
                  {loading ? (
                    <div className="flex flex-col items-center justify-center py-20 text-gray-500 font-medium">
                      <div className="w-10 h-10 border-4 border-[#d4951e] border-t-transparent rounded-full animate-spin mb-4" />
                      Loading gallery photos...
                    </div>
                  ) : galleryImages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
                      <div className="w-20 h-20 bg-[#d4951e]/10 text-[#d4951e] rounded-full flex items-center justify-center mb-4 shadow-inner">
                        <ImageIcon className="w-10 h-10" />
                      </div>
                      <h3 className="text-lg font-bold text-[#10194E]">No Custom Photos Uploaded Yet</h3>
                      <p className="text-sm text-gray-500 max-w-md mt-1 mb-6">
                        The public gallery currently displays all 48 default heritage destinations, client memories, and fleet cars. Click below to upload your own photos to feature at the top!
                      </p>
                      <button
                        onClick={() => setGalleryModal({
                          isOpen: true,
                          data: {
                            title: '',
                            category: 'places',
                            location: '',
                            badge: 'Featured Photo',
                            desc: '',
                            image: '',
                            span: 'col-span-1 sm:col-span-2 md:col-span-2 row-span-2'
                          }
                        })}
                        className="bg-[#10194E] hover:bg-[#283058] text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-md flex items-center gap-2 transition-all cursor-pointer"
                      >
                        <Upload className="w-4 h-4" /> Upload First Photo
                      </button>
                    </div>
                  ) : (
                    <div className="p-6">
                      {galleryImages.filter(g => galleryFilter === 'all' || (g.category || 'places') === galleryFilter).length === 0 ? (
                        <div className="text-center py-12 text-gray-400">
                          <p className="text-sm font-semibold">No photos found in this category.</p>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                          {galleryImages
                            .filter(g => galleryFilter === 'all' || (g.category || 'places') === galleryFilter)
                            .map((item) => {
                              const imgUrl = getGalleryImageUrl(item.image);
                              const catColors = {
                                places: 'bg-emerald-100 text-emerald-800 border-emerald-200',
                                cars: 'bg-blue-100 text-blue-800 border-blue-200',
                                clients: 'bg-amber-100 text-amber-800 border-amber-200'
                              };
                              const catLabels = {
                                places: 'Places & Temples',
                                cars: 'Fleet / Vehicles',
                                clients: 'Clients & Memoirs'
                              };

                              return (
                                <div
                                  key={item.id}
                                  className="group border border-[#edeae1] rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 bg-white flex flex-col justify-between"
                                >
                                  <div>
                                    {/* Image Thumbnail with Overlay preview */}
                                    <div className="relative h-48 bg-gray-900 overflow-hidden cursor-pointer" onClick={() => setPreviewLightbox(item)}>
                                      <img
                                        src={imgUrl}
                                        alt={item.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                      />
                                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                        <span className="bg-white/90 text-[#10194E] px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 shadow-md">
                                          <Eye className="w-3.5 h-3.5" /> Preview
                                        </span>
                                      </div>
                                      <div className="absolute top-2.5 left-2.5">
                                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border shadow-sm ${catColors[item.category] || catColors.places}`}>
                                          {catLabels[item.category] || 'Places'}
                                        </span>
                                      </div>
                                      {item.badge && (
                                        <div className="absolute bottom-2.5 left-2.5">
                                          <span className="text-[10px] font-bold bg-[#10194E]/90 text-[#D4AF37] px-2 py-0.5 rounded-md backdrop-blur-sm border border-[#D4AF37]/30">
                                            {item.badge}
                                          </span>
                                        </div>
                                      )}
                                    </div>

                                    {/* Card Content */}
                                    <div className="p-4 space-y-2">
                                      <h3 className="font-bold text-base text-[#10194E] line-clamp-1 group-hover:text-[#d4951e] transition-colors">
                                        {item.title}
                                      </h3>
                                      <div className="flex items-center gap-1.5 text-xs text-gray-500">
                                        <MapPin className="w-3.5 h-3.5 text-[#d4951e] shrink-0" />
                                        <span className="truncate font-medium">{item.location || 'Tamil Nadu'}</span>
                                      </div>
                                      {item.desc && (
                                        <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                                          {item.desc}
                                        </p>
                                      )}
                                    </div>
                                  </div>

                                  {/* Card Footer Actions */}
                                  <div className="px-4 py-3 bg-[#FAF8F5] border-t border-[#edeae1] flex items-center justify-between text-xs">
                                    <span className="text-[11px] text-gray-400 font-medium">
                                      {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'Active'}
                                    </span>
                                    <button
                                      onClick={() => handleDeleteGalleryImage(item.id)}
                                      className="text-red-500 hover:text-red-700 hover:bg-red-50 px-2.5 py-1 rounded-lg font-bold flex items-center gap-1 transition-all cursor-pointer"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" /> Delete
                                    </button>
                                  </div>
                                </div>
                              );
                            })}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* PACKAGES VIEW */}
            {activeTab === 'packages' && (
              <motion.div key="packages" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }}>
                <div className="bg-white rounded-3xl border border-[#edeae1] shadow-[0_8px_30px_rgb(0,0,0,0.06)] overflow-hidden">
                  <div className="p-6 border-b border-[#edeae1] flex justify-between items-center">
                    <h2 className="text-xl font-bold text-[#10194E]">Tour Packages</h2>
                    <button
                      onClick={() => handleOpenPkgModal(false)}
                      className="bg-[#d4951e] hover:bg-[#b57a15] text-white px-4 py-2 rounded-xl flex items-center gap-2 font-bold text-sm shadow-md transition-all"
                    >
                      <Plus className="w-4 h-4" /> Add Package
                    </button>
                  </div>
                  {loading ? (
                    <div className="flex flex-col items-center justify-center py-20 text-gray-500 font-medium">
                      <div className="w-10 h-10 border-4 border-[#d4951e] border-t-transparent rounded-full animate-spin mb-4"></div>
                      Loading packages...
                    </div>
                  ) : packages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                      <Package className="w-16 h-16 mb-4 text-gray-300" />
                      <p className="text-lg font-bold text-gray-800">No Packages Found</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 p-6">
                      {packages.map(pkg => (
                        <div key={pkg.id} className="border border-[#edeae1] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col">
                          <div className="h-40 bg-gray-100">
                            <img src={getPackageImage(pkg.image)} alt={pkg.name} className="w-full h-full object-cover" />
                          </div>
                          <div className="p-4 flex-grow flex flex-col">
                            <h3 className="font-bold text-lg text-[#10194E] truncate">{pkg.name}</h3>
                            <div className="flex justify-between items-center mt-1 text-xs font-bold">
                              <span className="text-gray-500 flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {pkg.duration}</span>
                              <span className="text-[#d4951e]">{pkg.price}</span>
                            </div>
                            <p className="text-xs text-gray-600 mt-3 line-clamp-3 flex-grow">{pkg.places}</p>
                            <div className="mt-4 flex justify-between items-center pt-3 border-t border-[#edeae1]">
                              <button onClick={() => handleOpenPkgModal(true, pkg)} className="text-[#10194E] hover:text-[#d4951e] font-bold text-sm flex items-center gap-1">
                                <Edit className="w-4 h-4" /> Edit
                              </button>
                              <button onClick={() => handleDeletePackage(pkg.id)} className="text-red-500 hover:text-red-600 font-bold text-sm flex items-center gap-1">
                                <Trash2 className="w-4 h-4" /> Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* GALLERY MANAGEMENT VIEW */}
            {activeTab === 'gallery' && (
              <motion.div key="gallery" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }}>
                <div className="bg-white rounded-3xl border border-[#edeae1] shadow-[0_8px_30px_rgb(0,0,0,0.06)] overflow-hidden">
                  
                  {/* Header Bar */}
                  <div className="p-6 border-b border-[#edeae1] flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-xl font-bold text-[#10194E] font-heading">Gallery Management</h2>
                        <span className="bg-[#10194E]/10 text-[#10194E] text-xs font-bold px-2.5 py-0.5 rounded-full">
                          {galleryImages.length} Uploaded
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Upload custom photos to instantly showcase them on the public <span className="font-semibold text-[#10194E]">/gallery</span> page.
                      </p>
                    </div>

                    <div className="flex items-center gap-3 self-stretch sm:self-auto">
                      <a
                        href="/gallery"
                        target="_blank"
                        rel="noreferrer"
                        className="px-4 py-2 rounded-xl border border-gray-300 text-gray-700 hover:text-[#10194E] hover:border-[#10194E] font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm"
                      >
                        <span>View Live Gallery</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                      <button
                        onClick={() => setGalleryModal({
                          isOpen: true,
                          data: {
                            title: '',
                            category: 'places',
                            location: '',
                            badge: 'Featured Photo',
                            desc: '',
                            image: '',
                            span: 'col-span-1 sm:col-span-2 md:col-span-2 row-span-2'
                          }
                        })}
                        className="bg-[#d4951e] hover:bg-[#b57a15] text-white px-4 py-2 rounded-xl flex items-center gap-2 font-bold text-sm shadow-md transition-all cursor-pointer"
                      >
                        <Plus className="w-4 h-4" /> Upload New Photo
                      </button>
                    </div>
                  </div>

                  {/* Filter Pills */}
                  <div className="px-6 py-3.5 bg-[#FAF8F5] border-b border-[#edeae1] flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold text-gray-500 mr-2 uppercase tracking-wider">Filter Section:</span>
                    {[
                      { id: 'all', label: 'All Photos', count: galleryImages.length },
                      { id: 'places', label: 'Places & Temples', count: galleryImages.filter(g => (g.category || 'places') === 'places').length },
                      { id: 'cars', label: 'Our Fleet', count: galleryImages.filter(g => g.category === 'cars').length },
                      { id: 'clients', label: 'Happy Clients', count: galleryImages.filter(g => g.category === 'clients').length }
                    ].map(tab => (
                      <button
                        key={tab.id}
                        onClick={() => setGalleryFilter(tab.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          galleryFilter === tab.id
                            ? 'bg-[#10194E] text-white shadow-sm'
                            : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                        }`}
                      >
                        {tab.label} ({tab.count})
                      </button>
                    ))}
                  </div>

                  {/* Content List */}
                  {loading ? (
                    <div className="flex flex-col items-center justify-center py-20 text-gray-500 font-medium">
                      <div className="w-10 h-10 border-4 border-[#d4951e] border-t-transparent rounded-full animate-spin mb-4" />
                      Loading gallery photos...
                    </div>
                  ) : galleryImages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
                      <div className="w-20 h-20 bg-[#d4951e]/10 text-[#d4951e] rounded-full flex items-center justify-center mb-4 shadow-inner">
                        <ImageIcon className="w-10 h-10" />
                      </div>
                      <h3 className="text-lg font-bold text-[#10194E]">No Custom Photos Uploaded Yet</h3>
                      <p className="text-sm text-gray-500 max-w-md mt-1 mb-6">
                        The public gallery currently displays all 48 default heritage destinations, client memories, and fleet cars. Click below to upload your own photos to feature at the top!
                      </p>
                      <button
                        onClick={() => setGalleryModal({
                          isOpen: true,
                          data: {
                            title: '',
                            category: 'places',
                            location: '',
                            badge: 'Featured Photo',
                            desc: '',
                            image: '',
                            span: 'col-span-1 sm:col-span-2 md:col-span-2 row-span-2'
                          }
                        })}
                        className="bg-[#10194E] hover:bg-[#283058] text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-md flex items-center gap-2 transition-all cursor-pointer"
                      >
                        <Upload className="w-4 h-4" /> Upload First Photo
                      </button>
                    </div>
                  ) : (
                    <div className="p-6">
                      {galleryImages.filter(g => galleryFilter === 'all' || (g.category || 'places') === galleryFilter).length === 0 ? (
                        <div className="text-center py-12 text-gray-400">
                          <p className="text-sm font-semibold">No photos found in this category.</p>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                          {galleryImages
                            .filter(g => galleryFilter === 'all' || (g.category || 'places') === galleryFilter)
                            .map((item) => {
                              const imgUrl = getGalleryImageUrl(item.image);
                              const catColors = {
                                places: 'bg-emerald-100 text-emerald-800 border-emerald-200',
                                cars: 'bg-blue-100 text-blue-800 border-blue-200',
                                clients: 'bg-amber-100 text-amber-800 border-amber-200'
                              };
                              const catLabels = {
                                places: 'Places & Temples',
                                cars: 'Fleet / Vehicles',
                                clients: 'Clients & Memoirs'
                              };

                              return (
                                <div
                                  key={item.id}
                                  className="group border border-[#edeae1] rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 bg-white flex flex-col justify-between"
                                >
                                  <div>
                                    {/* Image Thumbnail with Overlay preview */}
                                    <div className="relative h-48 bg-gray-900 overflow-hidden cursor-pointer" onClick={() => setPreviewLightbox(item)}>
                                      <img
                                        src={imgUrl}
                                        alt={item.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                      />
                                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                        <span className="bg-white/90 text-[#10194E] px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 shadow-md">
                                          <Eye className="w-3.5 h-3.5" /> Preview
                                        </span>
                                      </div>
                                      <div className="absolute top-2.5 left-2.5">
                                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border shadow-sm ${catColors[item.category] || catColors.places}`}>
                                          {catLabels[item.category] || 'Places'}
                                        </span>
                                      </div>
                                      {item.badge && (
                                        <div className="absolute bottom-2.5 left-2.5">
                                          <span className="text-[10px] font-bold bg-[#10194E]/90 text-[#D4AF37] px-2 py-0.5 rounded-md backdrop-blur-sm border border-[#D4AF37]/30">
                                            {item.badge}
                                          </span>
                                        </div>
                                      )}
                                    </div>

                                    {/* Card Content */}
                                    <div className="p-4 space-y-2">
                                      <h3 className="font-bold text-base text-[#10194E] line-clamp-1 group-hover:text-[#d4951e] transition-colors">
                                        {item.title}
                                      </h3>
                                      <div className="flex items-center gap-1.5 text-xs text-gray-500">
                                        <MapPin className="w-3.5 h-3.5 text-[#d4951e] shrink-0" />
                                        <span className="truncate font-medium">{item.location || 'Tamil Nadu'}</span>
                                      </div>
                                      {item.desc && (
                                        <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                                          {item.desc}
                                        </p>
                                      )}
                                    </div>
                                  </div>

                                  {/* Card Footer Actions */}
                                  <div className="px-4 py-3 bg-[#FAF8F5] border-t border-[#edeae1] flex items-center justify-between text-xs">
                                    <span className="text-[11px] text-gray-400 font-medium">
                                      {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'Active'}
                                    </span>
                                    <button
                                      onClick={() => handleDeleteGalleryImage(item.id)}
                                      className="text-red-500 hover:text-red-700 hover:bg-red-50 px-2.5 py-1 rounded-lg font-bold flex items-center gap-1 transition-all cursor-pointer"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" /> Delete
                                    </button>
                                  </div>
                                </div>
                              );
                            })}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* CONTACT MESSAGES VIEW */}
            {activeTab === 'contacts' && (
              <motion.div key="contacts" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }}>
                <div className="bg-white rounded-3xl border border-[#edeae1] shadow-[0_8px_30px_rgb(0,0,0,0.06)] overflow-hidden">
                  {loading ? (
                    <div className="text-center py-20">
                      <div className="w-10 h-10 border-4 border-[#d4951e] border-t-transparent rounded-full animate-spin mx-auto" />
                    </div>
                  ) : contacts.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                      <MessageSquare className="w-16 h-16 mb-4 text-gray-300" />
                      <p className="text-lg font-bold text-gray-800">No Message Queries</p>
                      <p className="text-sm text-gray-500 mt-1">Queries from customer Contact Us form show here.</p>
                    </div>
                  ) : (
                    <div className="divide-y divide-[#edeae1]">
                      {contacts.map(c => (
                        <div key={c.id} className="p-6 hover:bg-[#f7f5f0]/50 transition-colors flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                          <div className="space-y-2 w-full max-w-3xl">
                            <div className="flex flex-wrap items-center gap-3">
                              <span className="font-bold text-gray-800 text-lg">{c.name}</span>
                              <span className="text-xs text-[#10194E] bg-[#10194E]/5 px-2.5 py-1 rounded-md border border-[#10194E]/10 font-bold">
                                {new Date(c.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                            <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-gray-500 text-sm font-medium">
                              <span className="flex items-center gap-1.5"><Phone className="w-4 h-4 text-[#d4951e]" /> {c.phone}</span>
                              <span className="flex items-center gap-1.5"><Mail className="w-4 h-4 text-[#d4951e]" /> {c.email}</span>
                            </div>
                            <p className="text-gray-700 text-sm leading-relaxed pt-2 bg-[#f7f5f0] p-4 rounded-xl border border-[#edeae1] mt-3">
                              {c.message}
                            </p>
                          </div>
                          <button
                            onClick={() => handleDeleteContact(c.id)}
                            className="bg-red-50 text-red-500 hover:bg-red-500 hover:text-white p-3 rounded-xl border border-red-100 transition-all self-end md:self-auto cursor-pointer shadow-sm"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* GALLERY MANAGEMENT VIEW */}
            {activeTab === 'gallery' && (
              <motion.div key="gallery" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }}>
                <div className="bg-white rounded-3xl border border-[#edeae1] shadow-[0_8px_30px_rgb(0,0,0,0.06)] overflow-hidden">
                  
                  {/* Header Bar */}
                  <div className="p-6 border-b border-[#edeae1] flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-xl font-bold text-[#10194E] font-heading">Gallery Management</h2>
                        <span className="bg-[#10194E]/10 text-[#10194E] text-xs font-bold px-2.5 py-0.5 rounded-full">
                          {galleryImages.length} Uploaded
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Upload custom photos to instantly showcase them on the public <span className="font-semibold text-[#10194E]">/gallery</span> page.
                      </p>
                    </div>

                    <div className="flex items-center gap-3 self-stretch sm:self-auto">
                      <a
                        href="/gallery"
                        target="_blank"
                        rel="noreferrer"
                        className="px-4 py-2 rounded-xl border border-gray-300 text-gray-700 hover:text-[#10194E] hover:border-[#10194E] font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm"
                      >
                        <span>View Live Gallery</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                      <button
                        onClick={() => setGalleryModal({
                          isOpen: true,
                          data: {
                            title: '',
                            category: 'places',
                            location: '',
                            badge: 'Featured Photo',
                            desc: '',
                            image: '',
                            span: 'col-span-1 sm:col-span-2 md:col-span-2 row-span-2'
                          }
                        })}
                        className="bg-[#d4951e] hover:bg-[#b57a15] text-white px-4 py-2 rounded-xl flex items-center gap-2 font-bold text-sm shadow-md transition-all cursor-pointer"
                      >
                        <Plus className="w-4 h-4" /> Upload New Photo
                      </button>
                    </div>
                  </div>

                  {/* Filter Pills */}
                  <div className="px-6 py-3.5 bg-[#FAF8F5] border-b border-[#edeae1] flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold text-gray-500 mr-2 uppercase tracking-wider">Filter Section:</span>
                    {[
                      { id: 'all', label: 'All Photos', count: galleryImages.length },
                      { id: 'places', label: 'Places & Temples', count: galleryImages.filter(g => (g.category || 'places') === 'places').length },
                      { id: 'cars', label: 'Our Fleet', count: galleryImages.filter(g => g.category === 'cars').length },
                      { id: 'clients', label: 'Happy Clients', count: galleryImages.filter(g => g.category === 'clients').length }
                    ].map(tab => (
                      <button
                        key={tab.id}
                        onClick={() => setGalleryFilter(tab.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          galleryFilter === tab.id
                            ? 'bg-[#10194E] text-white shadow-sm'
                            : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                        }`}
                      >
                        {tab.label} ({tab.count})
                      </button>
                    ))}
                  </div>

                  {/* Content List */}
                  {loading ? (
                    <div className="flex flex-col items-center justify-center py-20 text-gray-500 font-medium">
                      <div className="w-10 h-10 border-4 border-[#d4951e] border-t-transparent rounded-full animate-spin mb-4" />
                      Loading gallery photos...
                    </div>
                  ) : galleryImages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
                      <div className="w-20 h-20 bg-[#d4951e]/10 text-[#d4951e] rounded-full flex items-center justify-center mb-4 shadow-inner">
                        <ImageIcon className="w-10 h-10" />
                      </div>
                      <h3 className="text-lg font-bold text-[#10194E]">No Custom Photos Uploaded Yet</h3>
                      <p className="text-sm text-gray-500 max-w-md mt-1 mb-6">
                        The public gallery currently displays all 48 default heritage destinations, client memories, and fleet cars. Click below to upload your own photos to feature at the top!
                      </p>
                      <button
                        onClick={() => setGalleryModal({
                          isOpen: true,
                          data: {
                            title: '',
                            category: 'places',
                            location: '',
                            badge: 'Featured Photo',
                            desc: '',
                            image: '',
                            span: 'col-span-1 sm:col-span-2 md:col-span-2 row-span-2'
                          }
                        })}
                        className="bg-[#10194E] hover:bg-[#283058] text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-md flex items-center gap-2 transition-all cursor-pointer"
                      >
                        <Upload className="w-4 h-4" /> Upload First Photo
                      </button>
                    </div>
                  ) : (
                    <div className="p-6">
                      {galleryImages.filter(g => galleryFilter === 'all' || (g.category || 'places') === galleryFilter).length === 0 ? (
                        <div className="text-center py-12 text-gray-400">
                          <p className="text-sm font-semibold">No photos found in this category.</p>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                          {galleryImages
                            .filter(g => galleryFilter === 'all' || (g.category || 'places') === galleryFilter)
                            .map((item) => {
                              const imgUrl = getGalleryImageUrl(item.image);
                              const catColors = {
                                places: 'bg-emerald-100 text-emerald-800 border-emerald-200',
                                cars: 'bg-blue-100 text-blue-800 border-blue-200',
                                clients: 'bg-amber-100 text-amber-800 border-amber-200'
                              };
                              const catLabels = {
                                places: 'Places & Temples',
                                cars: 'Fleet / Vehicles',
                                clients: 'Clients & Memoirs'
                              };

                              return (
                                <div
                                  key={item.id}
                                  className="group border border-[#edeae1] rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 bg-white flex flex-col justify-between"
                                >
                                  <div>
                                    {/* Image Thumbnail with Overlay preview */}
                                    <div className="relative h-48 bg-gray-900 overflow-hidden cursor-pointer" onClick={() => setPreviewLightbox(item)}>
                                      <img
                                        src={imgUrl}
                                        alt={item.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                      />
                                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                        <span className="bg-white/90 text-[#10194E] px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 shadow-md">
                                          <Eye className="w-3.5 h-3.5" /> Preview
                                        </span>
                                      </div>
                                      <div className="absolute top-2.5 left-2.5">
                                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border shadow-sm ${catColors[item.category] || catColors.places}`}>
                                          {catLabels[item.category] || 'Places'}
                                        </span>
                                      </div>
                                      {item.badge && (
                                        <div className="absolute bottom-2.5 left-2.5">
                                          <span className="text-[10px] font-bold bg-[#10194E]/90 text-[#D4AF37] px-2 py-0.5 rounded-md backdrop-blur-sm border border-[#D4AF37]/30">
                                            {item.badge}
                                          </span>
                                        </div>
                                      )}
                                    </div>

                                    {/* Card Content */}
                                    <div className="p-4 space-y-2">
                                      <h3 className="font-bold text-base text-[#10194E] line-clamp-1 group-hover:text-[#d4951e] transition-colors">
                                        {item.title}
                                      </h3>
                                      <div className="flex items-center gap-1.5 text-xs text-gray-500">
                                        <MapPin className="w-3.5 h-3.5 text-[#d4951e] shrink-0" />
                                        <span className="truncate font-medium">{item.location || 'Tamil Nadu'}</span>
                                      </div>
                                      {item.desc && (
                                        <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                                          {item.desc}
                                        </p>
                                      )}
                                    </div>
                                  </div>

                                  {/* Card Footer Actions */}
                                  <div className="px-4 py-3 bg-[#FAF8F5] border-t border-[#edeae1] flex items-center justify-between text-xs">
                                    <span className="text-[11px] text-gray-400 font-medium">
                                      {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'Active'}
                                    </span>
                                    <button
                                      onClick={() => handleDeleteGalleryImage(item.id)}
                                      className="text-red-500 hover:text-red-700 hover:bg-red-50 px-2.5 py-1 rounded-lg font-bold flex items-center gap-1 transition-all cursor-pointer"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" /> Delete
                                    </button>
                                  </div>
                                </div>
                              );
                            })}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* SETTINGS VIEW */}
            {activeTab === 'settings' && (
              <motion.div key="settings" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Settings form card */}
                  <div className="bg-white rounded-3xl border border-[#edeae1] shadow-[0_8px_30px_rgb(0,0,0,0.06)] p-8">
                    <h3 className="text-xl font-bold text-[#10194E] mb-6 pb-3 border-b border-[#edeae1] flex items-center gap-2 font-poppins">
                      <Settings className="w-5 h-5 text-[#d4951e]" /> Superadmin Profile Configurations
                    </h3>

                    <form onSubmit={handleSettingsSubmit} className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-gray-500 text-xs font-bold uppercase tracking-wider pl-1">Superadmin Username</label>
                        <div className="relative">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <input
                            type="text"
                            value={settings.name}
                            onChange={(e) => setSettings({ ...settings, name: e.target.value })}
                            className="w-full bg-[#f7f5f0] border border-[#edeae1] text-gray-800 pl-12 pr-4 py-3.5 rounded-xl focus:outline-none focus:border-[#d4951e] focus:ring-1 focus:ring-[#d4951e] transition-all text-sm font-semibold"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-gray-500 text-xs font-bold uppercase tracking-wider pl-1">Contact Phone</label>
                          <div className="relative">
                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                              type="text"
                              value={settings.phone}
                              onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                              className="w-full bg-[#f7f5f0] border border-[#edeae1] text-gray-800 pl-12 pr-4 py-3.5 rounded-xl focus:outline-none focus:border-[#d4951e] focus:ring-1 focus:ring-[#d4951e] transition-all text-sm font-semibold"
                              required
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-gray-500 text-xs font-bold uppercase tracking-wider pl-1">WhatsApp Dispatch Number</label>
                          <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-sm">WA</span>
                            <input
                              type="text"
                              value={settings.whatsapp}
                              onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })}
                              className="w-full bg-[#f7f5f0] border border-[#edeae1] text-gray-800 pl-12 pr-4 py-3.5 rounded-xl focus:outline-none focus:border-[#d4951e] focus:ring-1 focus:ring-[#d4951e] transition-all text-sm font-semibold"
                              required
                            />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-gray-500 text-xs font-bold uppercase tracking-wider pl-1">Change Security Passcode</label>
                        <div className="relative">
                          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <input
                            type="password"
                            value={settings.password}
                            onChange={(e) => setSettings({ ...settings, password: e.target.value })}
                            className="w-full bg-[#f7f5f0] border border-[#edeae1] text-gray-800 pl-12 pr-4 py-3.5 rounded-xl focus:outline-none focus:border-[#d4951e] focus:ring-1 focus:ring-[#d4951e] transition-all text-sm font-mono tracking-widest font-bold"
                            placeholder="••••••••"
                            required
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-[#10194E] hover:bg-[#283058] text-white font-bold py-4 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer font-poppins text-sm uppercase tracking-wider"
                      >
                        Save Configuration Settings
                      </button>
                    </form>
                  </div>

                  {/* WhatsApp Bot Connection Manager Card */}
                  <div className="bg-white rounded-3xl border border-[#edeae1] shadow-[0_8px_30px_rgb(0,0,0,0.06)] p-8 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-[#10194E] mb-6 pb-3 border-b border-[#edeae1] flex items-center gap-2 font-poppins">
                        <span className="text-[#d4951e]">⚡</span> WhatsApp Notification Bot Status
                      </h3>

                      <div className="bg-[#f7f5f0] rounded-2xl p-5 border border-[#edeae1] flex items-center justify-between mb-6 shadow-sm">
                        <div>
                          <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Bot Status</p>
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${whatsappStatus.isConnected
                            ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                            : 'bg-red-100 text-red-700 border border-red-200'
                            }`}>
                            <span className={`w-2 h-2 rounded-full ${whatsappStatus.isConnected ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`}></span>
                            {whatsappStatus.isConnected ? 'CONNECTED' : 'DISCONNECTED'}
                          </span>
                        </div>
                        <div className="flex gap-2">
                          {whatsappStatus.isConnected && (
                            <>
                              <button
                                onClick={handleWhatsappTest}
                                disabled={loadingWhatsapp}
                                className="bg-[#10194E] hover:bg-[#283058] text-white border border-[#10194E] shadow-sm px-4 py-2 rounded-xl text-xs font-bold transition-all disabled:opacity-50"
                              >
                                Test Message
                              </button>
                              <button
                                onClick={handleWhatsappDisconnect}
                                disabled={loadingWhatsapp}
                                className="bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 shadow-sm px-4 py-2 rounded-xl text-xs font-bold transition-all disabled:opacity-50"
                              >
                                Disconnect
                              </button>
                            </>
                          )}
                          <button
                            onClick={handleWhatsappReconnect}
                            disabled={loadingWhatsapp}
                            className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 shadow-sm px-4 py-2 rounded-xl text-xs font-bold transition-all disabled:opacity-50"
                          >
                            {loadingWhatsapp ? 'Processing...' : 'Reconnect Bot'}
                          </button>
                        </div>
                      </div>

                      {!whatsappStatus.isConnected && (
                        <div className="text-center p-6 bg-[#f7f5f0] border border-[#edeae1] rounded-2xl">
                          <p className="text-sm text-gray-800 font-bold mb-4">Scan QR code using WhatsApp Link a Device:</p>
                          {whatsappStatus.qrCode ? (
                            <div className="bg-white p-3 rounded-2xl inline-block shadow-md">
                              <img
                                src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(whatsappStatus.qrCode)}`}
                                alt="WhatsApp QR Code"
                                className="w-48 h-48 block mx-auto"
                              />
                            </div>
                          ) : (
                            <div className="py-8 flex flex-col items-center justify-center text-gray-500">
                              <div className="w-8 h-8 border-4 border-[#d4951e] border-t-transparent rounded-full animate-spin mb-3"></div>
                              <p className="text-xs font-medium">Waiting for server to generate QR code...</p>
                            </div>
                          )}
                          <p className="text-xs text-gray-500 mt-4 font-medium leading-relaxed">
                            Open WhatsApp on your phone → Tap Menu or Settings → Linked Devices → Link a Device.
                          </p>
                        </div>
                      )}

                      {whatsappStatus.isConnected && (
                        <div className="space-y-4">
                          <div className="text-center p-6 bg-emerald-50 border border-emerald-100 rounded-2xl text-emerald-700">
                            <p className="text-sm font-bold">Bot is active and ready to dispatch booking and contact alerts to admin.</p>
                          </div>

                          {/* Send Custom Message UI */}
                          <div className="bg-[#f7f5f0] border border-[#edeae1] rounded-2xl p-5 shadow-sm">
                            <h4 className="text-sm font-bold text-[#10194E] mb-4 flex items-center gap-2">
                              <MessageSquare className="w-4 h-4" /> Send Custom Message
                            </h4>
                            <div className="space-y-3">
                              <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-xs">WA</span>
                                <input
                                  type="text"
                                  value={customMsgPhone}
                                  onChange={(e) => setCustomMsgPhone(e.target.value)}
                                  className="w-full bg-white border border-[#edeae1] text-gray-800 pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:border-[#d4951e] focus:ring-1 focus:ring-[#d4951e] transition-all text-xs font-semibold"
                                  placeholder="Recipient Phone Number (e.g. 6382513075)"
                                />
                              </div>
                              <textarea
                                value={customMsgText}
                                onChange={(e) => setCustomMsgText(e.target.value)}
                                className="w-full bg-white border border-[#edeae1] text-gray-800 p-4 rounded-xl focus:outline-none focus:border-[#d4951e] focus:ring-1 focus:ring-[#d4951e] transition-all text-xs resize-none h-24 font-medium"
                                placeholder="Type your custom message here..."
                              ></textarea>
                              <button
                                onClick={handleSendCustomMessage}
                                disabled={sendingCustomMsg || !customMsgPhone || !customMsgText}
                                className="w-full bg-[#10194E] hover:bg-[#283058] text-white font-bold py-3 rounded-xl transition-all shadow-sm text-xs disabled:opacity-50 flex items-center justify-center gap-2"
                              >
                                {sendingCustomMsg ? 'Sending...' : 'Send Custom Message'}
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="mt-8 text-xs text-gray-400 font-medium">
                      <p>Note: Session credentials are stored securely in SQLite and persist across restarts.</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* GALLERY MANAGEMENT VIEW */}
            {activeTab === 'gallery' && (
              <motion.div key="gallery" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }}>
                <div className="bg-white rounded-3xl border border-[#edeae1] shadow-[0_8px_30px_rgb(0,0,0,0.06)] overflow-hidden">
                  
                  {/* Header Bar */}
                  <div className="p-6 border-b border-[#edeae1] flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-xl font-bold text-[#10194E] font-heading">Gallery Management</h2>
                        <span className="bg-[#10194E]/10 text-[#10194E] text-xs font-bold px-2.5 py-0.5 rounded-full">
                          {galleryImages.length} Uploaded
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Upload custom photos to instantly showcase them on the public <span className="font-semibold text-[#10194E]">/gallery</span> page.
                      </p>
                    </div>

                    <div className="flex items-center gap-3 self-stretch sm:self-auto">
                      <a
                        href="/gallery"
                        target="_blank"
                        rel="noreferrer"
                        className="px-4 py-2 rounded-xl border border-gray-300 text-gray-700 hover:text-[#10194E] hover:border-[#10194E] font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm"
                      >
                        <span>View Live Gallery</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                      <button
                        onClick={() => setGalleryModal({
                          isOpen: true,
                          data: {
                            title: '',
                            category: 'places',
                            location: '',
                            badge: 'Featured Photo',
                            desc: '',
                            image: '',
                            span: 'col-span-1 sm:col-span-2 md:col-span-2 row-span-2'
                          }
                        })}
                        className="bg-[#d4951e] hover:bg-[#b57a15] text-white px-4 py-2 rounded-xl flex items-center gap-2 font-bold text-sm shadow-md transition-all cursor-pointer"
                      >
                        <Plus className="w-4 h-4" /> Upload New Photo
                      </button>
                    </div>
                  </div>

                  {/* Filter Pills */}
                  <div className="px-6 py-3.5 bg-[#FAF8F5] border-b border-[#edeae1] flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold text-gray-500 mr-2 uppercase tracking-wider">Filter Section:</span>
                    {[
                      { id: 'all', label: 'All Photos', count: galleryImages.length },
                      { id: 'places', label: 'Places & Temples', count: galleryImages.filter(g => (g.category || 'places') === 'places').length },
                      { id: 'cars', label: 'Our Fleet', count: galleryImages.filter(g => g.category === 'cars').length },
                      { id: 'clients', label: 'Happy Clients', count: galleryImages.filter(g => g.category === 'clients').length }
                    ].map(tab => (
                      <button
                        key={tab.id}
                        onClick={() => setGalleryFilter(tab.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          galleryFilter === tab.id
                            ? 'bg-[#10194E] text-white shadow-sm'
                            : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                        }`}
                      >
                        {tab.label} ({tab.count})
                      </button>
                    ))}
                  </div>

                  {/* Content List */}
                  {loading ? (
                    <div className="flex flex-col items-center justify-center py-20 text-gray-500 font-medium">
                      <div className="w-10 h-10 border-4 border-[#d4951e] border-t-transparent rounded-full animate-spin mb-4" />
                      Loading gallery photos...
                    </div>
                  ) : galleryImages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
                      <div className="w-20 h-20 bg-[#d4951e]/10 text-[#d4951e] rounded-full flex items-center justify-center mb-4 shadow-inner">
                        <ImageIcon className="w-10 h-10" />
                      </div>
                      <h3 className="text-lg font-bold text-[#10194E]">No Custom Photos Uploaded Yet</h3>
                      <p className="text-sm text-gray-500 max-w-md mt-1 mb-6">
                        The public gallery currently displays all 48 default heritage destinations, client memories, and fleet cars. Click below to upload your own photos to feature at the top!
                      </p>
                      <button
                        onClick={() => setGalleryModal({
                          isOpen: true,
                          data: {
                            title: '',
                            category: 'places',
                            location: '',
                            badge: 'Featured Photo',
                            desc: '',
                            image: '',
                            span: 'col-span-1 sm:col-span-2 md:col-span-2 row-span-2'
                          }
                        })}
                        className="bg-[#10194E] hover:bg-[#283058] text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-md flex items-center gap-2 transition-all cursor-pointer"
                      >
                        <Upload className="w-4 h-4" /> Upload First Photo
                      </button>
                    </div>
                  ) : (
                    <div className="p-6">
                      {galleryImages.filter(g => galleryFilter === 'all' || (g.category || 'places') === galleryFilter).length === 0 ? (
                        <div className="text-center py-12 text-gray-400">
                          <p className="text-sm font-semibold">No photos found in this category.</p>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                          {galleryImages
                            .filter(g => galleryFilter === 'all' || (g.category || 'places') === galleryFilter)
                            .map((item) => {
                              const imgUrl = getGalleryImageUrl(item.image);
                              const catColors = {
                                places: 'bg-emerald-100 text-emerald-800 border-emerald-200',
                                cars: 'bg-blue-100 text-blue-800 border-blue-200',
                                clients: 'bg-amber-100 text-amber-800 border-amber-200'
                              };
                              const catLabels = {
                                places: 'Places & Temples',
                                cars: 'Fleet / Vehicles',
                                clients: 'Clients & Memoirs'
                              };

                              return (
                                <div
                                  key={item.id}
                                  className="group border border-[#edeae1] rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 bg-white flex flex-col justify-between"
                                >
                                  <div>
                                    {/* Image Thumbnail with Overlay preview */}
                                    <div className="relative h-48 bg-gray-900 overflow-hidden cursor-pointer" onClick={() => setPreviewLightbox(item)}>
                                      <img
                                        src={imgUrl}
                                        alt={item.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                      />
                                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                        <span className="bg-white/90 text-[#10194E] px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 shadow-md">
                                          <Eye className="w-3.5 h-3.5" /> Preview
                                        </span>
                                      </div>
                                      <div className="absolute top-2.5 left-2.5">
                                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border shadow-sm ${catColors[item.category] || catColors.places}`}>
                                          {catLabels[item.category] || 'Places'}
                                        </span>
                                      </div>
                                      {item.badge && (
                                        <div className="absolute bottom-2.5 left-2.5">
                                          <span className="text-[10px] font-bold bg-[#10194E]/90 text-[#D4AF37] px-2 py-0.5 rounded-md backdrop-blur-sm border border-[#D4AF37]/30">
                                            {item.badge}
                                          </span>
                                        </div>
                                      )}
                                    </div>

                                    {/* Card Content */}
                                    <div className="p-4 space-y-2">
                                      <h3 className="font-bold text-base text-[#10194E] line-clamp-1 group-hover:text-[#d4951e] transition-colors">
                                        {item.title}
                                      </h3>
                                      <div className="flex items-center gap-1.5 text-xs text-gray-500">
                                        <MapPin className="w-3.5 h-3.5 text-[#d4951e] shrink-0" />
                                        <span className="truncate font-medium">{item.location || 'Tamil Nadu'}</span>
                                      </div>
                                      {item.desc && (
                                        <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                                          {item.desc}
                                        </p>
                                      )}
                                    </div>
                                  </div>

                                  {/* Card Footer Actions */}
                                  <div className="px-4 py-3 bg-[#FAF8F5] border-t border-[#edeae1] flex items-center justify-between text-xs">
                                    <span className="text-[11px] text-gray-400 font-medium">
                                      {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'Active'}
                                    </span>
                                    <button
                                      onClick={() => handleDeleteGalleryImage(item.id)}
                                      className="text-red-500 hover:text-red-700 hover:bg-red-50 px-2.5 py-1 rounded-lg font-bold flex items-center gap-1 transition-all cursor-pointer"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" /> Delete
                                    </button>
                                  </div>
                                </div>
                              );
                            })}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* ADD ADMIN VIEW */}
            {activeTab === 'add-admin' && (
              <motion.div key="add-admin" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }}>
                <div className="max-w-2xl bg-white rounded-3xl border border-[#edeae1] shadow-[0_8px_30px_rgb(0,0,0,0.06)] p-8">
                  <h3 className="text-xl font-bold text-[#10194E] mb-6 pb-3 border-b border-[#edeae1] flex items-center gap-2 font-poppins">
                    <UserPlus className="w-5 h-5 text-[#d4951e]" /> Create Administrator Account
                  </h3>

                  <form onSubmit={handleAddAdminSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-gray-500 text-xs font-bold uppercase tracking-wider pl-1">Account ID / Username</label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="text"
                          value={newAdmin.name}
                          onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })}
                          className="w-full bg-[#f7f5f0] border border-[#edeae1] text-gray-800 pl-12 pr-4 py-3.5 rounded-xl focus:outline-none focus:border-[#d4951e] focus:ring-1 focus:ring-[#d4951e] transition-all text-sm font-semibold"
                          placeholder="e.g. Subadmin2"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-gray-500 text-xs font-bold uppercase tracking-wider pl-1">Phone</label>
                        <div className="relative">
                          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <input
                            type="text"
                            value={newAdmin.phone}
                            onChange={(e) => setNewAdmin({ ...newAdmin, phone: e.target.value })}
                            className="w-full bg-[#f7f5f0] border border-[#edeae1] text-gray-800 pl-12 pr-4 py-3.5 rounded-xl focus:outline-none focus:border-[#d4951e] focus:ring-1 focus:ring-[#d4951e] transition-all text-sm font-semibold"
                            placeholder="Enter phone number"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-gray-500 text-xs font-bold uppercase tracking-wider pl-1">WhatsApp Number</label>
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-sm">WA</span>
                          <input
                            type="text"
                            value={newAdmin.whatsapp}
                            onChange={(e) => setNewAdmin({ ...newAdmin, whatsapp: e.target.value })}
                            className="w-full bg-[#f7f5f0] border border-[#edeae1] text-gray-800 pl-12 pr-4 py-3.5 rounded-xl focus:outline-none focus:border-[#d4951e] focus:ring-1 focus:ring-[#d4951e] transition-all text-sm font-semibold"
                            placeholder="Enter WhatsApp alert recipient number"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-gray-500 text-xs font-bold uppercase tracking-wider pl-1">Security Passcode</label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="password"
                          value={newAdmin.password}
                          onChange={(e) => setNewAdmin({ ...newAdmin, password: e.target.value })}
                          className="w-full bg-[#f7f5f0] border border-[#edeae1] text-gray-800 pl-12 pr-4 py-3.5 rounded-xl focus:outline-none focus:border-[#d4951e] focus:ring-1 focus:ring-[#d4951e] transition-all text-sm font-semibold"
                          placeholder="Create passcode"
                          required
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-[#10194E] hover:bg-[#283058] text-white font-bold py-4 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer font-poppins text-sm uppercase tracking-wider"
                    >
                      Register Admin Account
                    </button>
                  </form>
                </div>
              </motion.div>
            )}

            {/* GALLERY MANAGEMENT VIEW */}
            {activeTab === 'gallery' && (
              <motion.div key="gallery" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }}>
                <div className="bg-white rounded-3xl border border-[#edeae1] shadow-[0_8px_30px_rgb(0,0,0,0.06)] overflow-hidden">
                  
                  {/* Header Bar */}
                  <div className="p-6 border-b border-[#edeae1] flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-xl font-bold text-[#10194E] font-heading">Gallery Management</h2>
                        <span className="bg-[#10194E]/10 text-[#10194E] text-xs font-bold px-2.5 py-0.5 rounded-full">
                          {galleryImages.length} Uploaded
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Upload custom photos to instantly showcase them on the public <span className="font-semibold text-[#10194E]">/gallery</span> page.
                      </p>
                    </div>

                    <div className="flex items-center gap-3 self-stretch sm:self-auto">
                      <a
                        href="/gallery"
                        target="_blank"
                        rel="noreferrer"
                        className="px-4 py-2 rounded-xl border border-gray-300 text-gray-700 hover:text-[#10194E] hover:border-[#10194E] font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm"
                      >
                        <span>View Live Gallery</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                      <button
                        onClick={() => setGalleryModal({
                          isOpen: true,
                          data: {
                            title: '',
                            category: 'places',
                            location: '',
                            badge: 'Featured Photo',
                            desc: '',
                            image: '',
                            span: 'col-span-1 sm:col-span-2 md:col-span-2 row-span-2'
                          }
                        })}
                        className="bg-[#d4951e] hover:bg-[#b57a15] text-white px-4 py-2 rounded-xl flex items-center gap-2 font-bold text-sm shadow-md transition-all cursor-pointer"
                      >
                        <Plus className="w-4 h-4" /> Upload New Photo
                      </button>
                    </div>
                  </div>

                  {/* Filter Pills */}
                  <div className="px-6 py-3.5 bg-[#FAF8F5] border-b border-[#edeae1] flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold text-gray-500 mr-2 uppercase tracking-wider">Filter Section:</span>
                    {[
                      { id: 'all', label: 'All Photos', count: galleryImages.length },
                      { id: 'places', label: 'Places & Temples', count: galleryImages.filter(g => (g.category || 'places') === 'places').length },
                      { id: 'cars', label: 'Our Fleet', count: galleryImages.filter(g => g.category === 'cars').length },
                      { id: 'clients', label: 'Happy Clients', count: galleryImages.filter(g => g.category === 'clients').length }
                    ].map(tab => (
                      <button
                        key={tab.id}
                        onClick={() => setGalleryFilter(tab.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          galleryFilter === tab.id
                            ? 'bg-[#10194E] text-white shadow-sm'
                            : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                        }`}
                      >
                        {tab.label} ({tab.count})
                      </button>
                    ))}
                  </div>

                  {/* Content List */}
                  {loading ? (
                    <div className="flex flex-col items-center justify-center py-20 text-gray-500 font-medium">
                      <div className="w-10 h-10 border-4 border-[#d4951e] border-t-transparent rounded-full animate-spin mb-4" />
                      Loading gallery photos...
                    </div>
                  ) : galleryImages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
                      <div className="w-20 h-20 bg-[#d4951e]/10 text-[#d4951e] rounded-full flex items-center justify-center mb-4 shadow-inner">
                        <ImageIcon className="w-10 h-10" />
                      </div>
                      <h3 className="text-lg font-bold text-[#10194E]">No Custom Photos Uploaded Yet</h3>
                      <p className="text-sm text-gray-500 max-w-md mt-1 mb-6">
                        The public gallery currently displays all 48 default heritage destinations, client memories, and fleet cars. Click below to upload your own photos to feature at the top!
                      </p>
                      <button
                        onClick={() => setGalleryModal({
                          isOpen: true,
                          data: {
                            title: '',
                            category: 'places',
                            location: '',
                            badge: 'Featured Photo',
                            desc: '',
                            image: '',
                            span: 'col-span-1 sm:col-span-2 md:col-span-2 row-span-2'
                          }
                        })}
                        className="bg-[#10194E] hover:bg-[#283058] text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-md flex items-center gap-2 transition-all cursor-pointer"
                      >
                        <Upload className="w-4 h-4" /> Upload First Photo
                      </button>
                    </div>
                  ) : (
                    <div className="p-6">
                      {galleryImages.filter(g => galleryFilter === 'all' || (g.category || 'places') === galleryFilter).length === 0 ? (
                        <div className="text-center py-12 text-gray-400">
                          <p className="text-sm font-semibold">No photos found in this category.</p>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                          {galleryImages
                            .filter(g => galleryFilter === 'all' || (g.category || 'places') === galleryFilter)
                            .map((item) => {
                              const imgUrl = getGalleryImageUrl(item.image);
                              const catColors = {
                                places: 'bg-emerald-100 text-emerald-800 border-emerald-200',
                                cars: 'bg-blue-100 text-blue-800 border-blue-200',
                                clients: 'bg-amber-100 text-amber-800 border-amber-200'
                              };
                              const catLabels = {
                                places: 'Places & Temples',
                                cars: 'Fleet / Vehicles',
                                clients: 'Clients & Memoirs'
                              };

                              return (
                                <div
                                  key={item.id}
                                  className="group border border-[#edeae1] rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 bg-white flex flex-col justify-between"
                                >
                                  <div>
                                    {/* Image Thumbnail with Overlay preview */}
                                    <div className="relative h-48 bg-gray-900 overflow-hidden cursor-pointer" onClick={() => setPreviewLightbox(item)}>
                                      <img
                                        src={imgUrl}
                                        alt={item.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                      />
                                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                        <span className="bg-white/90 text-[#10194E] px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 shadow-md">
                                          <Eye className="w-3.5 h-3.5" /> Preview
                                        </span>
                                      </div>
                                      <div className="absolute top-2.5 left-2.5">
                                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border shadow-sm ${catColors[item.category] || catColors.places}`}>
                                          {catLabels[item.category] || 'Places'}
                                        </span>
                                      </div>
                                      {item.badge && (
                                        <div className="absolute bottom-2.5 left-2.5">
                                          <span className="text-[10px] font-bold bg-[#10194E]/90 text-[#D4AF37] px-2 py-0.5 rounded-md backdrop-blur-sm border border-[#D4AF37]/30">
                                            {item.badge}
                                          </span>
                                        </div>
                                      )}
                                    </div>

                                    {/* Card Content */}
                                    <div className="p-4 space-y-2">
                                      <h3 className="font-bold text-base text-[#10194E] line-clamp-1 group-hover:text-[#d4951e] transition-colors">
                                        {item.title}
                                      </h3>
                                      <div className="flex items-center gap-1.5 text-xs text-gray-500">
                                        <MapPin className="w-3.5 h-3.5 text-[#d4951e] shrink-0" />
                                        <span className="truncate font-medium">{item.location || 'Tamil Nadu'}</span>
                                      </div>
                                      {item.desc && (
                                        <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                                          {item.desc}
                                        </p>
                                      )}
                                    </div>
                                  </div>

                                  {/* Card Footer Actions */}
                                  <div className="px-4 py-3 bg-[#FAF8F5] border-t border-[#edeae1] flex items-center justify-between text-xs">
                                    <span className="text-[11px] text-gray-400 font-medium">
                                      {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'Active'}
                                    </span>
                                    <button
                                      onClick={() => handleDeleteGalleryImage(item.id)}
                                      className="text-red-500 hover:text-red-700 hover:bg-red-50 px-2.5 py-1 rounded-lg font-bold flex items-center gap-1 transition-all cursor-pointer"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" /> Delete
                                    </button>
                                  </div>
                                </div>
                              );
                            })}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            )}

          </AnimatePresence>

          {/* VEHICLE MODAL */}
          <AnimatePresence>
            {carModal.isOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
              >
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  className="bg-white rounded-3xl p-6 w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto"
                >
                  <div className="flex justify-between items-center mb-6 border-b border-[#edeae1] pb-3">
                    <h3 className="text-xl font-bold text-[#10194E] font-poppins">{carModal.isEdit ? 'Edit Vehicle' : 'Add New Vehicle'}</h3>
                    <button onClick={() => setCarModal({ isOpen: false, isEdit: false, data: null })} className="text-gray-400 hover:text-gray-600"><X className="w-6 h-6" /></button>
                  </div>
                  <form onSubmit={handleCarSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-bold text-gray-500 uppercase">Vehicle Name</label>
                        <input type="text" value={carModal.data.name} onChange={e => setCarModal({ ...carModal, data: { ...carModal.data, name: e.target.value } })} className="w-full mt-1 bg-[#f7f5f0] border border-[#edeae1] p-3 rounded-xl focus:outline-none focus:border-[#d4951e]" required />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-gray-500 uppercase">Price String (e.g. ₹12/km)</label>
                        <input type="text" value={carModal.data.price} onChange={e => setCarModal({ ...carModal, data: { ...carModal.data, price: e.target.value } })} className="w-full mt-1 bg-[#f7f5f0] border border-[#edeae1] p-3 rounded-xl focus:outline-none focus:border-[#d4951e]" required />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-gray-500 uppercase">Seats</label>
                        <select value={carModal.data.seats} onChange={e => setCarModal({ ...carModal, data: { ...carModal.data, seats: e.target.value } })} className="w-full mt-1 bg-[#f7f5f0] border border-[#edeae1] p-3 rounded-xl focus:outline-none focus:border-[#d4951e]">
                          <option>4 Seater</option><option>7 Seater</option><option>12 Seater</option><option>18 Seater</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-xs font-bold text-gray-500 uppercase">AC / Non-AC</label>
                        <select value={carModal.data.ac} onChange={e => setCarModal({ ...carModal, data: { ...carModal.data, ac: e.target.value } })} className="w-full mt-1 bg-[#f7f5f0] border border-[#edeae1] p-3 rounded-xl focus:outline-none focus:border-[#d4951e]">
                          <option>AC</option><option>Non-AC</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-xs font-bold text-gray-500 uppercase">Vehicle Image</label>
                        <div className="mt-1 flex items-center gap-4">
                          {carModal.data.image && (
                            <img src={getVehicleImage(carModal.data.image)} alt="Preview" className="h-12 w-16 object-contain bg-white rounded-lg border border-gray-200 shadow-sm" />
                          )}
                          <label className="bg-[#10194E] hover:bg-[#283058] text-white px-4 py-2 rounded-xl cursor-pointer transition-all shadow-sm flex items-center gap-2">
                            <Upload className="w-4 h-4" />
                            <span className="text-sm font-bold">Upload Image</span>
                            <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, setCarModal, 'image')} />
                          </label>
                        </div>
                      </div>

                    </div>
                    <div className="pt-4 border-t border-[#edeae1]">
                      <h4 className="text-sm font-bold text-[#10194E] mb-3 uppercase tracking-wider">Outstation Plan Details</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="text-[10px] font-bold text-gray-500 uppercase">Rate (e.g. ₹14/km)</label>
                          <input type="text" value={carModal.data.outstationRate || ''} onChange={e => setCarModal({ ...carModal, data: { ...carModal.data, outstationRate: e.target.value } })} className="w-full mt-1 bg-[#f7f5f0] border border-[#edeae1] p-2.5 rounded-xl text-sm focus:outline-none focus:border-[#d4951e]" placeholder="Rate" />
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-gray-500 uppercase">Min Distance</label>
                          <input type="text" value={carModal.data.outstationMinKm || ''} onChange={e => setCarModal({ ...carModal, data: { ...carModal.data, outstationMinKm: e.target.value } })} className="w-full mt-1 bg-[#f7f5f0] border border-[#edeae1] p-2.5 rounded-xl text-sm focus:outline-none focus:border-[#d4951e]" placeholder="Above 250 km" />
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-gray-500 uppercase">Driver Charge</label>
                          <input type="text" value={carModal.data.outstationDriver || ''} onChange={e => setCarModal({ ...carModal, data: { ...carModal.data, outstationDriver: e.target.value } })} className="w-full mt-1 bg-[#f7f5f0] border border-[#edeae1] p-2.5 rounded-xl text-sm focus:outline-none focus:border-[#d4951e]" placeholder="₹300/day" />
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-[#edeae1]">
                      <h4 className="text-sm font-bold text-[#10194E] mb-3 uppercase tracking-wider">Day Rental Plan Details</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="text-[10px] font-bold text-gray-500 uppercase">Base Rent</label>
                          <input type="text" value={carModal.data.dayBaseRent || ''} onChange={e => setCarModal({ ...carModal, data: { ...carModal.data, dayBaseRent: e.target.value } })} className="w-full mt-1 bg-[#f7f5f0] border border-[#edeae1] p-2.5 rounded-xl text-sm focus:outline-none focus:border-[#d4951e]" placeholder="Rs. 2700" />
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-gray-500 uppercase">Per km Charge</label>
                          <input type="text" value={carModal.data.dayPerKm || ''} onChange={e => setCarModal({ ...carModal, data: { ...carModal.data, dayPerKm: e.target.value } })} className="w-full mt-1 bg-[#f7f5f0] border border-[#edeae1] p-2.5 rounded-xl text-sm focus:outline-none focus:border-[#d4951e]" placeholder="Rs. 17/km" />
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-gray-500 uppercase">Driver Charge</label>
                          <input type="text" value={carModal.data.dayDriver || ''} onChange={e => setCarModal({ ...carModal, data: { ...carModal.data, dayDriver: e.target.value } })} className="w-full mt-1 bg-[#f7f5f0] border border-[#edeae1] p-2.5 rounded-xl text-sm focus:outline-none focus:border-[#d4951e]" placeholder="Rs. 400/day" />
                        </div>
                      </div>
                    </div>
                    <button type="submit" className="w-full bg-[#10194E] text-white font-bold py-3 rounded-xl mt-4 hover:bg-[#283058] transition-all">
                      {carModal.isEdit ? 'Save Changes' : 'Add Vehicle'}
                    </button>
                  </form>
                </motion.div>
              </motion.div>
            )}

            {/* GALLERY MANAGEMENT VIEW */}
            {activeTab === 'gallery' && (
              <motion.div key="gallery" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }}>
                <div className="bg-white rounded-3xl border border-[#edeae1] shadow-[0_8px_30px_rgb(0,0,0,0.06)] overflow-hidden">
                  
                  {/* Header Bar */}
                  <div className="p-6 border-b border-[#edeae1] flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-xl font-bold text-[#10194E] font-heading">Gallery Management</h2>
                        <span className="bg-[#10194E]/10 text-[#10194E] text-xs font-bold px-2.5 py-0.5 rounded-full">
                          {galleryImages.length} Uploaded
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Upload custom photos to instantly showcase them on the public <span className="font-semibold text-[#10194E]">/gallery</span> page.
                      </p>
                    </div>

                    <div className="flex items-center gap-3 self-stretch sm:self-auto">
                      <a
                        href="/gallery"
                        target="_blank"
                        rel="noreferrer"
                        className="px-4 py-2 rounded-xl border border-gray-300 text-gray-700 hover:text-[#10194E] hover:border-[#10194E] font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm"
                      >
                        <span>View Live Gallery</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                      <button
                        onClick={() => setGalleryModal({
                          isOpen: true,
                          data: {
                            title: '',
                            category: 'places',
                            location: '',
                            badge: 'Featured Photo',
                            desc: '',
                            image: '',
                            span: 'col-span-1 sm:col-span-2 md:col-span-2 row-span-2'
                          }
                        })}
                        className="bg-[#d4951e] hover:bg-[#b57a15] text-white px-4 py-2 rounded-xl flex items-center gap-2 font-bold text-sm shadow-md transition-all cursor-pointer"
                      >
                        <Plus className="w-4 h-4" /> Upload New Photo
                      </button>
                    </div>
                  </div>

                  {/* Filter Pills */}
                  <div className="px-6 py-3.5 bg-[#FAF8F5] border-b border-[#edeae1] flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold text-gray-500 mr-2 uppercase tracking-wider">Filter Section:</span>
                    {[
                      { id: 'all', label: 'All Photos', count: galleryImages.length },
                      { id: 'places', label: 'Places & Temples', count: galleryImages.filter(g => (g.category || 'places') === 'places').length },
                      { id: 'cars', label: 'Our Fleet', count: galleryImages.filter(g => g.category === 'cars').length },
                      { id: 'clients', label: 'Happy Clients', count: galleryImages.filter(g => g.category === 'clients').length }
                    ].map(tab => (
                      <button
                        key={tab.id}
                        onClick={() => setGalleryFilter(tab.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          galleryFilter === tab.id
                            ? 'bg-[#10194E] text-white shadow-sm'
                            : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                        }`}
                      >
                        {tab.label} ({tab.count})
                      </button>
                    ))}
                  </div>

                  {/* Content List */}
                  {loading ? (
                    <div className="flex flex-col items-center justify-center py-20 text-gray-500 font-medium">
                      <div className="w-10 h-10 border-4 border-[#d4951e] border-t-transparent rounded-full animate-spin mb-4" />
                      Loading gallery photos...
                    </div>
                  ) : galleryImages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
                      <div className="w-20 h-20 bg-[#d4951e]/10 text-[#d4951e] rounded-full flex items-center justify-center mb-4 shadow-inner">
                        <ImageIcon className="w-10 h-10" />
                      </div>
                      <h3 className="text-lg font-bold text-[#10194E]">No Custom Photos Uploaded Yet</h3>
                      <p className="text-sm text-gray-500 max-w-md mt-1 mb-6">
                        The public gallery currently displays all 48 default heritage destinations, client memories, and fleet cars. Click below to upload your own photos to feature at the top!
                      </p>
                      <button
                        onClick={() => setGalleryModal({
                          isOpen: true,
                          data: {
                            title: '',
                            category: 'places',
                            location: '',
                            badge: 'Featured Photo',
                            desc: '',
                            image: '',
                            span: 'col-span-1 sm:col-span-2 md:col-span-2 row-span-2'
                          }
                        })}
                        className="bg-[#10194E] hover:bg-[#283058] text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-md flex items-center gap-2 transition-all cursor-pointer"
                      >
                        <Upload className="w-4 h-4" /> Upload First Photo
                      </button>
                    </div>
                  ) : (
                    <div className="p-6">
                      {galleryImages.filter(g => galleryFilter === 'all' || (g.category || 'places') === galleryFilter).length === 0 ? (
                        <div className="text-center py-12 text-gray-400">
                          <p className="text-sm font-semibold">No photos found in this category.</p>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                          {galleryImages
                            .filter(g => galleryFilter === 'all' || (g.category || 'places') === galleryFilter)
                            .map((item) => {
                              const imgUrl = getGalleryImageUrl(item.image);
                              const catColors = {
                                places: 'bg-emerald-100 text-emerald-800 border-emerald-200',
                                cars: 'bg-blue-100 text-blue-800 border-blue-200',
                                clients: 'bg-amber-100 text-amber-800 border-amber-200'
                              };
                              const catLabels = {
                                places: 'Places & Temples',
                                cars: 'Fleet / Vehicles',
                                clients: 'Clients & Memoirs'
                              };

                              return (
                                <div
                                  key={item.id}
                                  className="group border border-[#edeae1] rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 bg-white flex flex-col justify-between"
                                >
                                  <div>
                                    {/* Image Thumbnail with Overlay preview */}
                                    <div className="relative h-48 bg-gray-900 overflow-hidden cursor-pointer" onClick={() => setPreviewLightbox(item)}>
                                      <img
                                        src={imgUrl}
                                        alt={item.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                      />
                                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                        <span className="bg-white/90 text-[#10194E] px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 shadow-md">
                                          <Eye className="w-3.5 h-3.5" /> Preview
                                        </span>
                                      </div>
                                      <div className="absolute top-2.5 left-2.5">
                                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border shadow-sm ${catColors[item.category] || catColors.places}`}>
                                          {catLabels[item.category] || 'Places'}
                                        </span>
                                      </div>
                                      {item.badge && (
                                        <div className="absolute bottom-2.5 left-2.5">
                                          <span className="text-[10px] font-bold bg-[#10194E]/90 text-[#D4AF37] px-2 py-0.5 rounded-md backdrop-blur-sm border border-[#D4AF37]/30">
                                            {item.badge}
                                          </span>
                                        </div>
                                      )}
                                    </div>

                                    {/* Card Content */}
                                    <div className="p-4 space-y-2">
                                      <h3 className="font-bold text-base text-[#10194E] line-clamp-1 group-hover:text-[#d4951e] transition-colors">
                                        {item.title}
                                      </h3>
                                      <div className="flex items-center gap-1.5 text-xs text-gray-500">
                                        <MapPin className="w-3.5 h-3.5 text-[#d4951e] shrink-0" />
                                        <span className="truncate font-medium">{item.location || 'Tamil Nadu'}</span>
                                      </div>
                                      {item.desc && (
                                        <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                                          {item.desc}
                                        </p>
                                      )}
                                    </div>
                                  </div>

                                  {/* Card Footer Actions */}
                                  <div className="px-4 py-3 bg-[#FAF8F5] border-t border-[#edeae1] flex items-center justify-between text-xs">
                                    <span className="text-[11px] text-gray-400 font-medium">
                                      {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'Active'}
                                    </span>
                                    <button
                                      onClick={() => handleDeleteGalleryImage(item.id)}
                                      className="text-red-500 hover:text-red-700 hover:bg-red-50 px-2.5 py-1 rounded-lg font-bold flex items-center gap-1 transition-all cursor-pointer"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" /> Delete
                                    </button>
                                  </div>
                                </div>
                              );
                            })}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* PACKAGE MODAL */}
          <AnimatePresence>
            {pkgModal.isOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
              >
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  className="bg-white rounded-3xl p-6 w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto"
                >
                  <div className="flex justify-between items-center mb-6 border-b border-[#edeae1] pb-3">
                    <h3 className="text-xl font-bold text-[#10194E] font-poppins">{pkgModal.isEdit ? 'Edit Package' : 'Add New Package'}</h3>
                    <button onClick={() => setPkgModal({ isOpen: false, isEdit: false, data: null })} className="text-gray-400 hover:text-gray-600"><X className="w-6 h-6" /></button>
                  </div>
                  <form onSubmit={handlePkgSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-bold text-gray-500 uppercase">Package Name</label>
                        <input type="text" value={pkgModal.data.name} onChange={e => setPkgModal({ ...pkgModal, data: { ...pkgModal.data, name: e.target.value } })} className="w-full mt-1 bg-[#f7f5f0] border border-[#edeae1] p-3 rounded-xl focus:outline-none focus:border-[#d4951e]" required />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-gray-500 uppercase">Duration & Distance</label>
                        <input type="text" value={pkgModal.data.duration} onChange={e => setPkgModal({ ...pkgModal, data: { ...pkgModal.data, duration: e.target.value } })} className="w-full mt-1 bg-[#f7f5f0] border border-[#edeae1] p-3 rounded-xl focus:outline-none focus:border-[#d4951e]" placeholder="e.g. 12 Hours / 300 KM" required />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-gray-500 uppercase">Price</label>
                        <input type="text" value={pkgModal.data.price} onChange={e => setPkgModal({ ...pkgModal, data: { ...pkgModal.data, price: e.target.value } })} className="w-full mt-1 bg-[#f7f5f0] border border-[#edeae1] p-3 rounded-xl focus:outline-none focus:border-[#d4951e]" placeholder="e.g. ₹5000" required />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-gray-500 uppercase">Cover Image</label>
                        <div className="mt-1 flex items-center gap-4">
                          {pkgModal.data.image && (
                            <img src={getPackageImage(pkgModal.data.image)} alt="Preview" className="h-12 w-16 object-cover bg-white rounded-lg border border-gray-200 shadow-sm" />
                          )}
                          <label className="bg-[#10194E] hover:bg-[#283058] text-white px-4 py-2 rounded-xl cursor-pointer transition-all shadow-sm flex items-center gap-2">
                            <Upload className="w-4 h-4" />
                            <span className="text-sm font-bold">Upload Image</span>
                            <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, setPkgModal, 'image')} />
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                      <div>
                        <label className="text-xs font-bold text-gray-500 uppercase">Rating</label>
                        <input type="text" value={pkgModal.data.rating || ''} onChange={e => setPkgModal({ ...pkgModal, data: { ...pkgModal.data, rating: e.target.value } })} className="w-full mt-1 bg-[#f7f5f0] border border-[#edeae1] p-3 rounded-xl focus:outline-none focus:border-[#d4951e]" placeholder="e.g. 5.0" />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-gray-500 uppercase">Review Count</label>
                        <input type="text" value={pkgModal.data.reviewCount || ''} onChange={e => setPkgModal({ ...pkgModal, data: { ...pkgModal.data, reviewCount: e.target.value } })} className="w-full mt-1 bg-[#f7f5f0] border border-[#edeae1] p-3 rounded-xl focus:outline-none focus:border-[#d4951e]" placeholder="e.g. 250+" />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-gray-500 uppercase">Location</label>
                        <input type="text" value={pkgModal.data.location || ''} onChange={e => setPkgModal({ ...pkgModal, data: { ...pkgModal.data, location: e.target.value } })} className="w-full mt-1 bg-[#f7f5f0] border border-[#edeae1] p-3 rounded-xl focus:outline-none focus:border-[#d4951e]" placeholder="e.g. Thanjavur, Tamil Nadu" />
                      </div>
                    </div>
                    <div className="mt-4">
                      <label className="text-xs font-bold text-gray-500 uppercase">Places Covered (Description)</label>
                      <textarea value={pkgModal.data.places} onChange={e => setPkgModal({ ...pkgModal, data: { ...pkgModal.data, places: e.target.value } })} className="w-full mt-1 bg-[#f7f5f0] border border-[#edeae1] p-3 rounded-xl focus:outline-none focus:border-[#d4951e] h-24" required></textarea>
                    </div>
                    <button type="submit" className="w-full bg-[#10194E] text-white font-bold py-3 rounded-xl mt-4 hover:bg-[#283058] transition-all">
                      {pkgModal.isEdit ? 'Save Changes' : 'Add Package'}
                    </button>
                  </form>
                </motion.div>
              </motion.div>
            )}

            {/* GALLERY UPLOAD MODAL */}
            {galleryModal.isOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
              >
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  className="bg-white rounded-3xl p-6 sm:p-8 w-full max-w-2xl shadow-2xl max-h-[92vh] overflow-y-auto"
                >
                  <div className="flex justify-between items-center mb-6 border-b border-[#edeae1] pb-3">
                    <div>
                      <h3 className="text-xl font-bold text-[#10194E] font-poppins">Upload Image to Gallery</h3>
                      <p className="text-xs text-gray-500 mt-0.5">This photo will be displayed prominently on your public Gallery page.</p>
                    </div>
                    <button
                      onClick={() => setGalleryModal({ isOpen: false, data: galleryModal.data })}
                      className="text-gray-400 hover:text-gray-600 p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>

                  <form onSubmit={handleGallerySubmit} className="space-y-4">
                    
                    {/* Image Upload Box */}
                    <div>
                      <label className="text-xs font-bold text-gray-600 uppercase tracking-wider block mb-1.5">
                        Select Photo <span className="text-red-500">*</span>
                      </label>
                      
                      <label className="border-2 border-dashed border-[#edeae1] hover:border-[#d4951e] rounded-2xl p-5 bg-[#FAF8F5] hover:bg-[#FAF6EC] transition-all flex flex-col items-center justify-center gap-3 cursor-pointer group relative block">
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleGalleryImageUpload}
                          disabled={uploadingGalleryImg}
                        />
                        {galleryModal.data.image ? (
                          <div className="relative w-full max-w-md h-52 bg-black/5 rounded-xl overflow-hidden shadow-inner flex items-center justify-center">
                            <img
                              src={getGalleryImageUrl(galleryModal.data.image)}
                              alt="Preview"
                              className="w-full h-full object-contain"
                            />
                            <button
                              type="button"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setGalleryModal(prev => ({ ...prev, data: { ...prev.data, image: '' } }));
                              }}
                              className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-1.5 rounded-lg shadow-md transition-colors z-10"
                              title="Remove image"
                            >
                              <X className="w-4 h-4" />
                            </button>
                            <div className="absolute bottom-2 left-2 right-2 bg-black/60 backdrop-blur-sm text-white text-[11px] font-semibold text-center py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
                              Click to choose another photo
                            </div>
                          </div>
                        ) : (
                          <div className="text-center py-4 space-y-2">
                            <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mx-auto shadow-sm text-[#d4951e] group-hover:scale-110 transition-transform">
                              <Upload className="w-7 h-7" />
                            </div>
                            <div>
                              <p className="text-sm font-bold text-gray-800">
                                {uploadingGalleryImg ? 'Optimizing photo...' : 'Click anywhere to choose a photo from device'}
                              </p>
                              <p className="text-xs text-gray-500 mt-0.5">Supports all camera formats (JPG, PNG, WEBP, HEIC)</p>
                            </div>
                            <div className="pt-2">
                              <span className="inline-flex items-center gap-2 bg-[#10194E] group-hover:bg-[#283058] text-white px-4 py-2 rounded-xl text-xs font-bold shadow-sm transition-all">
                                <Upload className="w-3.5 h-3.5" />
                                <span>Browse Photos</span>
                              </span>
                            </div>
                          </div>
                        )}
                      </label>

                      {/* Or paste URL fallback */}
                      <div className="mt-2 flex items-center gap-2">
                        <span className="text-[11px] font-bold text-gray-400 uppercase">Or Image URL:</span>
                        <input
                          type="url"
                          placeholder="https://example.com/photo.jpg or /gallery/photo.jpeg"
                          value={galleryModal.data.image.startsWith('data:') ? '' : galleryModal.data.image}
                          onChange={(e) => setGalleryModal(prev => ({ ...prev, data: { ...prev.data, image: e.target.value } }))}
                          className="flex-1 text-xs bg-[#f7f5f0] border border-[#edeae1] p-2 rounded-lg focus:outline-none focus:border-[#d4951e]"
                        />
                      </div>
                    </div>

                    {/* Title & Category */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-bold text-gray-600 uppercase tracking-wider block mb-1">
                          Photo Title <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Brihadeeswara Temple Sunrise"
                          value={galleryModal.data.title}
                          onChange={e => setGalleryModal({ ...galleryModal, data: { ...galleryModal.data, title: e.target.value } })}
                          className="w-full bg-[#f7f5f0] border border-[#edeae1] p-3 rounded-xl focus:outline-none focus:border-[#d4951e] text-sm"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold text-gray-600 uppercase tracking-wider block mb-1">
                          Gallery Section / Category <span className="text-red-500">*</span>
                        </label>
                        <select
                          value={galleryModal.data.category}
                          onChange={e => setGalleryModal({ ...galleryModal, data: { ...galleryModal.data, category: e.target.value } })}
                          className="w-full bg-[#f7f5f0] border border-[#edeae1] p-3 rounded-xl focus:outline-none focus:border-[#d4951e] text-sm font-semibold"
                        >
                          <option value="places">1. Places & Sacred Destinations</option>
                          <option value="cars">2. Our Fleet & Touring Cars</option>
                          <option value="clients">3. Clients & Traveler Memoirs</option>
                        </select>
                      </div>
                    </div>

                    {/* Location & Badge */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-bold text-gray-600 uppercase tracking-wider block mb-1">
                          Location / Context
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Thanjavur, Tamil Nadu"
                          value={galleryModal.data.location}
                          onChange={e => setGalleryModal({ ...galleryModal, data: { ...galleryModal.data, location: e.target.value } })}
                          className="w-full bg-[#f7f5f0] border border-[#edeae1] p-3 rounded-xl focus:outline-none focus:border-[#d4951e] text-sm"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold text-gray-600 uppercase tracking-wider block mb-1">
                          Badge / Tag
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. UNESCO World Heritage"
                          value={galleryModal.data.badge}
                          onChange={e => setGalleryModal({ ...galleryModal, data: { ...galleryModal.data, badge: e.target.value } })}
                          className="w-full bg-[#f7f5f0] border border-[#edeae1] p-3 rounded-xl focus:outline-none focus:border-[#d4951e] text-sm"
                        />
                      </div>
                    </div>

                    {/* Description */}
                    <div>
                      <label className="text-xs font-bold text-gray-600 uppercase tracking-wider block mb-1">
                        Short Caption / Description
                      </label>
                      <textarea
                        rows={2}
                        placeholder="Short narrative highlighting the journey, architecture, or tourist experience..."
                        value={galleryModal.data.desc}
                        onChange={e => setGalleryModal({ ...galleryModal, data: { ...galleryModal.data, desc: e.target.value } })}
                        className="w-full bg-[#f7f5f0] border border-[#edeae1] p-3 rounded-xl focus:outline-none focus:border-[#d4951e] text-sm"
                      />
                    </div>

                    {/* Layout Span */}
                    <div>
                      <label className="text-xs font-bold text-gray-600 uppercase tracking-wider block mb-1">
                        Display Layout Size in Collage
                      </label>
                      <select
                        value={galleryModal.data.span}
                        onChange={e => setGalleryModal({ ...galleryModal, data: { ...galleryModal.data, span: e.target.value } })}
                        className="w-full bg-[#f7f5f0] border border-[#edeae1] p-2.5 rounded-xl focus:outline-none focus:border-[#d4951e] text-xs"
                      >
                        <option value="col-span-1 sm:col-span-2 md:col-span-2 row-span-2">Featured Big Hero Card (2x2 Spanning)</option>
                        <option value="col-span-1 sm:col-span-2 row-span-1">Wide Panoramic Card (2x1 Spanning)</option>
                        <option value="col-span-1 row-span-2">Tall Portrait Card (1x2 Spanning)</option>
                        <option value="col-span-1 row-span-1">Standard Compact Card (1x1 Spanning)</option>
                      </select>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={uploadingGalleryImg}
                      className="w-full bg-[#10194E] hover:bg-[#283058] text-white font-bold py-3.5 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer mt-4"
                    >
                      <Upload className="w-4 h-4" />
                      <span>Publish Photo to Public Gallery</span>
                    </button>
                  </form>
                </motion.div>
              </motion.div>
            )}

            {/* LIGHTBOX PREVIEW MODAL */}
            {previewLightbox && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setPreviewLightbox(null)}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md cursor-pointer"
              >
                <div
                  onClick={e => e.stopPropagation()}
                  className="relative max-w-4xl w-full bg-[#10194E] rounded-3xl overflow-hidden shadow-2xl border border-brand-gold/30 text-white flex flex-col cursor-default"
                >
                  <button
                    onClick={() => setPreviewLightbox(null)}
                    className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 text-white hover:bg-black/80 flex items-center justify-center border border-white/20 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  <div className="relative max-h-[70vh] bg-black flex items-center justify-center overflow-hidden">
                    <img
                      src={getGalleryImageUrl(previewLightbox.image)}
                      alt={previewLightbox.title}
                      className="max-h-[70vh] w-auto object-contain"
                    />
                  </div>

                  <div className="p-6 bg-gradient-to-t from-[#0B1138] to-[#10194E] space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-brand-gold/20 text-brand-gold border border-brand-gold/40">
                        {previewLightbox.category?.toUpperCase() || 'PLACES'}
                      </span>
                      {previewLightbox.badge && (
                        <span className="text-xs font-bold text-neutral-300">
                          • {previewLightbox.badge}
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl font-bold font-heading text-white">{previewLightbox.title}</h3>
                    <div className="flex items-center gap-1.5 text-xs text-[#FCF6BA]">
                      <MapPin className="w-3.5 h-3.5 text-brand-gold" />
                      <span>{previewLightbox.location}</span>
                    </div>
                    {previewLightbox.desc && (
                      <p className="text-sm text-neutral-300 leading-relaxed pt-1">
                        {previewLightbox.desc}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {/* GALLERY MANAGEMENT VIEW */}
            {activeTab === 'gallery' && (
              <motion.div key="gallery" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }}>
                <div className="bg-white rounded-3xl border border-[#edeae1] shadow-[0_8px_30px_rgb(0,0,0,0.06)] overflow-hidden">
                  
                  {/* Header Bar */}
                  <div className="p-6 border-b border-[#edeae1] flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-xl font-bold text-[#10194E] font-heading">Gallery Management</h2>
                        <span className="bg-[#10194E]/10 text-[#10194E] text-xs font-bold px-2.5 py-0.5 rounded-full">
                          {galleryImages.length} Uploaded
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Upload custom photos to instantly showcase them on the public <span className="font-semibold text-[#10194E]">/gallery</span> page.
                      </p>
                    </div>

                    <div className="flex items-center gap-3 self-stretch sm:self-auto">
                      <a
                        href="/gallery"
                        target="_blank"
                        rel="noreferrer"
                        className="px-4 py-2 rounded-xl border border-gray-300 text-gray-700 hover:text-[#10194E] hover:border-[#10194E] font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm"
                      >
                        <span>View Live Gallery</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                      <button
                        onClick={() => setGalleryModal({
                          isOpen: true,
                          data: {
                            title: '',
                            category: 'places',
                            location: '',
                            badge: 'Featured Photo',
                            desc: '',
                            image: '',
                            span: 'col-span-1 sm:col-span-2 md:col-span-2 row-span-2'
                          }
                        })}
                        className="bg-[#d4951e] hover:bg-[#b57a15] text-white px-4 py-2 rounded-xl flex items-center gap-2 font-bold text-sm shadow-md transition-all cursor-pointer"
                      >
                        <Plus className="w-4 h-4" /> Upload New Photo
                      </button>
                    </div>
                  </div>

                  {/* Filter Pills */}
                  <div className="px-6 py-3.5 bg-[#FAF8F5] border-b border-[#edeae1] flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold text-gray-500 mr-2 uppercase tracking-wider">Filter Section:</span>
                    {[
                      { id: 'all', label: 'All Photos', count: galleryImages.length },
                      { id: 'places', label: 'Places & Temples', count: galleryImages.filter(g => (g.category || 'places') === 'places').length },
                      { id: 'cars', label: 'Our Fleet', count: galleryImages.filter(g => g.category === 'cars').length },
                      { id: 'clients', label: 'Happy Clients', count: galleryImages.filter(g => g.category === 'clients').length }
                    ].map(tab => (
                      <button
                        key={tab.id}
                        onClick={() => setGalleryFilter(tab.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          galleryFilter === tab.id
                            ? 'bg-[#10194E] text-white shadow-sm'
                            : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                        }`}
                      >
                        {tab.label} ({tab.count})
                      </button>
                    ))}
                  </div>

                  {/* Content List */}
                  {loading ? (
                    <div className="flex flex-col items-center justify-center py-20 text-gray-500 font-medium">
                      <div className="w-10 h-10 border-4 border-[#d4951e] border-t-transparent rounded-full animate-spin mb-4" />
                      Loading gallery photos...
                    </div>
                  ) : galleryImages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
                      <div className="w-20 h-20 bg-[#d4951e]/10 text-[#d4951e] rounded-full flex items-center justify-center mb-4 shadow-inner">
                        <ImageIcon className="w-10 h-10" />
                      </div>
                      <h3 className="text-lg font-bold text-[#10194E]">No Custom Photos Uploaded Yet</h3>
                      <p className="text-sm text-gray-500 max-w-md mt-1 mb-6">
                        The public gallery currently displays all 48 default heritage destinations, client memories, and fleet cars. Click below to upload your own photos to feature at the top!
                      </p>
                      <button
                        onClick={() => setGalleryModal({
                          isOpen: true,
                          data: {
                            title: '',
                            category: 'places',
                            location: '',
                            badge: 'Featured Photo',
                            desc: '',
                            image: '',
                            span: 'col-span-1 sm:col-span-2 md:col-span-2 row-span-2'
                          }
                        })}
                        className="bg-[#10194E] hover:bg-[#283058] text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-md flex items-center gap-2 transition-all cursor-pointer"
                      >
                        <Upload className="w-4 h-4" /> Upload First Photo
                      </button>
                    </div>
                  ) : (
                    <div className="p-6">
                      {galleryImages.filter(g => galleryFilter === 'all' || (g.category || 'places') === galleryFilter).length === 0 ? (
                        <div className="text-center py-12 text-gray-400">
                          <p className="text-sm font-semibold">No photos found in this category.</p>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                          {galleryImages
                            .filter(g => galleryFilter === 'all' || (g.category || 'places') === galleryFilter)
                            .map((item) => {
                              const imgUrl = getGalleryImageUrl(item.image);
                              const catColors = {
                                places: 'bg-emerald-100 text-emerald-800 border-emerald-200',
                                cars: 'bg-blue-100 text-blue-800 border-blue-200',
                                clients: 'bg-amber-100 text-amber-800 border-amber-200'
                              };
                              const catLabels = {
                                places: 'Places & Temples',
                                cars: 'Fleet / Vehicles',
                                clients: 'Clients & Memoirs'
                              };

                              return (
                                <div
                                  key={item.id}
                                  className="group border border-[#edeae1] rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 bg-white flex flex-col justify-between"
                                >
                                  <div>
                                    {/* Image Thumbnail with Overlay preview */}
                                    <div className="relative h-48 bg-gray-900 overflow-hidden cursor-pointer" onClick={() => setPreviewLightbox(item)}>
                                      <img
                                        src={imgUrl}
                                        alt={item.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                      />
                                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                        <span className="bg-white/90 text-[#10194E] px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 shadow-md">
                                          <Eye className="w-3.5 h-3.5" /> Preview
                                        </span>
                                      </div>
                                      <div className="absolute top-2.5 left-2.5">
                                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border shadow-sm ${catColors[item.category] || catColors.places}`}>
                                          {catLabels[item.category] || 'Places'}
                                        </span>
                                      </div>
                                      {item.badge && (
                                        <div className="absolute bottom-2.5 left-2.5">
                                          <span className="text-[10px] font-bold bg-[#10194E]/90 text-[#D4AF37] px-2 py-0.5 rounded-md backdrop-blur-sm border border-[#D4AF37]/30">
                                            {item.badge}
                                          </span>
                                        </div>
                                      )}
                                    </div>

                                    {/* Card Content */}
                                    <div className="p-4 space-y-2">
                                      <h3 className="font-bold text-base text-[#10194E] line-clamp-1 group-hover:text-[#d4951e] transition-colors">
                                        {item.title}
                                      </h3>
                                      <div className="flex items-center gap-1.5 text-xs text-gray-500">
                                        <MapPin className="w-3.5 h-3.5 text-[#d4951e] shrink-0" />
                                        <span className="truncate font-medium">{item.location || 'Tamil Nadu'}</span>
                                      </div>
                                      {item.desc && (
                                        <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                                          {item.desc}
                                        </p>
                                      )}
                                    </div>
                                  </div>

                                  {/* Card Footer Actions */}
                                  <div className="px-4 py-3 bg-[#FAF8F5] border-t border-[#edeae1] flex items-center justify-between text-xs">
                                    <span className="text-[11px] text-gray-400 font-medium">
                                      {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'Active'}
                                    </span>
                                    <button
                                      onClick={() => handleDeleteGalleryImage(item.id)}
                                      className="text-red-500 hover:text-red-700 hover:bg-red-50 px-2.5 py-1 rounded-lg font-bold flex items-center gap-1 transition-all cursor-pointer"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" /> Delete
                                    </button>
                                  </div>
                                </div>
                              );
                            })}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </main>
      </div>

      {/* Trip Bill / PDF Invoice Generator Modal */}
      <TripBillModal
        isOpen={billModal.isOpen}
        onClose={() => setBillModal({ isOpen: false, booking: null })}
        booking={billModal.booking}
        settings={settings}
        cars={cars}
      />

    </div>
  );
};

export default AdminDashboard;
