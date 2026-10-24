import jsPDF from 'jspdf';

/**
 * Converts numbers into formal Indian Currency format (e.g. Rupees Eight Thousand Six Hundred and Fifty Only)
 */
export function numberToWords(num) {
  const a = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
  const b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
  num = Math.round(Number(num) || 0);
  if (num === 0) return 'Rupees Zero Only';
  if (num.toString().length > 9) return `Rupees ${num.toLocaleString('en-IN')} Only`;
  const n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
  if (!n) return '';
  let str = '';
  str += (Number(n[1]) !== 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + ' Crore ' : '';
  str += (Number(n[2]) !== 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + ' Lakh ' : '';
  str += (Number(n[3]) !== 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + ' Thousand ' : '';
  str += (Number(n[4]) !== 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + ' Hundred ' : '';
  str += (Number(n[5]) !== 0) ? ((str !== '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) : '';
  return 'Rupees ' + str.trim() + ' Only';
}

/**
 * Generates an authentic, professional Tours & Travels Duty Slip & Invoice PDF.
 * Crafted with luxury emerald & gold branding, itemized commercial travel billing,
 * odometer readings, advance settlement, UPI ID, and legal travel duty conditions.
 */
export function generateVectorBillPdf(billData, calculations, settings) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const {
    distanceFare = 0,
    totalBata = 0,
    nightBata = 0,
    waitingAmt = 0,
    tollAmt = 0,
    permitAmt = 0,
    totalFare = 0,
    advance = 0,
    balanceAmount = 0
  } = calculations || {};

  // Theme Palette: Emerald & Heritage Gold (matches Nithamudayar Tours & Travels)
  const emeraldDark = [26, 60, 52];     // #1a3c34
  const goldPrimary = [212, 175, 55];    // #d4af37
  const goldLight = [253, 248, 225];
  const bgCream = [250, 248, 243];
  const borderCream = [225, 218, 205];
  const darkText = [30, 25, 20];
  const grayText = [100, 95, 90];

  // 1. Outer Double Border Frame (Professional Invoice look)
  doc.setDrawColor(...emeraldDark);
  doc.setLineWidth(0.4);
  doc.rect(8, 8, 194, 281);
  doc.setLineWidth(0.15);
  doc.rect(9.5, 9.5, 191, 278);

  // 2. Header Area
  doc.setFillColor(...emeraldDark);
  doc.rect(9.5, 9.5, 191, 26, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14.5);
  const companyName = billData.cabServiceName || settings?.name || 'NITHAMUDAYAR TOURS AND TRAVELS';
  doc.text(companyName.toUpperCase(), 14, 18);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(...goldLight);
  doc.text('Premium Luxury Fleet • Force Urbania • Innova Crysta • Tempo Traveller • 24x7 Cab Services', 14, 23.5);
  doc.setTextColor(235, 235, 235);
  doc.setFontSize(7);
  const contactPhone = settings?.phone || billData.phone || '9894116405';
  const contactWa = settings?.whatsapp || '9894116405';
  doc.text(`Trichy • Madurai • Thanjavur • Chennai • All South India | Call: +91 ${contactPhone} • WhatsApp: +91 ${contactWa}`, 14, 28.5);

  // Header Right Badge: INVOICE / DUTY SLIP
  doc.setFillColor(...goldPrimary);
  doc.roundedRect(136, 12, 60, 21, 1.5, 1.5, 'F');
  doc.setTextColor(...emeraldDark);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.text('TRIP INVOICE & DUTY SLIP', 166, 17.5, { align: 'center' });
  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'normal');
  doc.text(`Bill No: ${billData.billNo || 'NTT-2026-0001'}`, 166, 22.5, { align: 'center' });
  doc.text(`Date: ${billData.date || new Date().toLocaleDateString('en-GB')}  ${billData.time || ''}`, 166, 27, { align: 'center' });

  // 3. Customer & Vehicle Grid (Dual Cards)
  let y = 39;
  doc.setFillColor(...bgCream);
  doc.setDrawColor(...borderCream);
  doc.roundedRect(12, y, 90, 33, 1.5, 1.5, 'FD');
  doc.roundedRect(108, y, 90, 33, 1.5, 1.5, 'FD');

  // Customer Card Header Strip
  doc.setFillColor(...emeraldDark);
  doc.rect(12, y, 90, 6, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.text('CUSTOMER / PASSENGER DETAILS', 16, y + 4.2);

  doc.setFontSize(7.5);
  doc.setTextColor(...grayText);
  doc.setFont('helvetica', 'normal');
  doc.text('Customer Name:', 16, y + 11);
  doc.setTextColor(...darkText);
  doc.setFont('helvetica', 'bold');
  doc.text(billData.customerName || 'Walk-in Guest', 45, y + 11);

  doc.setTextColor(...grayText);
  doc.setFont('helvetica', 'normal');
  doc.text('Contact No:', 16, y + 16.5);
  doc.setTextColor(...darkText);
  doc.setFont('helvetica', 'bold');
  doc.text(billData.phone || '+91 98941 16405', 45, y + 16.5);

  doc.setTextColor(...grayText);
  doc.setFont('helvetica', 'normal');
  doc.text('Pickup From:', 16, y + 22);
  doc.setTextColor(...darkText);
  doc.setFont('helvetica', 'bold');
  doc.text((billData.fromLocation || 'Pickup Point').slice(0, 30), 45, y + 22);

  doc.setTextColor(...grayText);
  doc.setFont('helvetica', 'normal');
  doc.text('Drop / Route:', 16, y + 27.5);
  doc.setTextColor(...darkText);
  doc.setFont('helvetica', 'bold');
  doc.text((billData.toLocation || 'Destination').slice(0, 30), 45, y + 27.5);

  // Vehicle Card Header Strip
  doc.setFillColor(...emeraldDark);
  doc.rect(108, y, 90, 6, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.text('VEHICLE & CHAUFFEUR PARTICULARS', 112, y + 4.2);

  doc.setFontSize(7.5);
  doc.setTextColor(...grayText);
  doc.setFont('helvetica', 'normal');
  doc.text('Vehicle Model:', 112, y + 11);
  doc.setTextColor(...darkText);
  doc.setFont('helvetica', 'bold');
  doc.text(billData.vehicleModel || 'Commercial Cab', 140, y + 11);

  doc.setTextColor(...grayText);
  doc.setFont('helvetica', 'normal');
  doc.text('Registration No:', 112, y + 16.5);
  doc.setTextColor(...darkText);
  doc.setFont('helvetica', 'bold');
  doc.text(billData.vehicleNo || 'TN 49 AB 2026', 140, y + 16.5);

  doc.setTextColor(...grayText);
  doc.setFont('helvetica', 'normal');
  doc.text('Chauffeur Name:', 112, y + 22);
  doc.setTextColor(...darkText);
  doc.setFont('helvetica', 'bold');
  doc.text(billData.driverName || 'Professional Chauffeur', 140, y + 22);

  doc.setTextColor(...grayText);
  doc.setFont('helvetica', 'normal');
  doc.text('Trip Type / Nature:', 112, y + 27.5);
  doc.setTextColor(...darkText);
  doc.setFont('helvetica', 'bold');
  doc.text(billData.tripType || 'Outstation Round Trip', 140, y + 27.5);

  // 4. Trip Meter / Odometer Duty Log Bar
  y = 75;
  doc.setFillColor(243, 239, 231);
  doc.setDrawColor(...borderCream);
  doc.roundedRect(12, y, 186, 11, 1.5, 1.5, 'FD');

  const openingKm = billData.openingKm || 14500;
  const closingKm = billData.closingKm || (Number(openingKm) + Number(billData.distanceKm || 0));
  const billedKm = billData.distanceKm || 0;

  doc.setFontSize(7);
  doc.setTextColor(...grayText);
  doc.setFont('helvetica', 'bold');
  doc.text('OPENING KM:', 16, y + 4.5);
  doc.text('CLOSING KM:', 58, y + 4.5);
  doc.text('TOTAL RUN:', 98, y + 4.5);
  doc.text('BILLED KM:', 134, y + 4.5);
  doc.text('RATE / KM:', 168, y + 4.5);

  doc.setFontSize(8.5);
  doc.setTextColor(...emeraldDark);
  doc.text(`${openingKm.toLocaleString()} KM`, 16, y + 9);
  doc.text(`${closingKm.toLocaleString()} KM`, 58, y + 9);
  doc.text(`${billedKm} KM`, 98, y + 9);
  doc.text(`${billedKm} KM`, 134, y + 9);
  doc.text(`Rs. ${billData.ratePerKm || 0} / KM`, 168, y + 9);

  // 5. Itemized Particulars & Charges Table
  y = 90;
  doc.setFillColor(...emeraldDark);
  doc.rect(12, y, 186, 7, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.text('S.NO', 16, y + 4.8);
  doc.text('PARTICULARS / SERVICE DESCRIPTION', 32, y + 4.8);
  doc.text('QTY / DETAILS', 120, y + 4.8, { align: 'center' });
  doc.text('RATE (Rs.)', 154, y + 4.8, { align: 'right' });
  doc.text('AMOUNT (Rs.)', 194, y + 4.8, { align: 'right' });

  y += 7;
  const items = [
    {
      no: '1',
      desc: 'Base Kilometre Running Charges',
      details: `${billedKm} KM`,
      rate: Number(billData.ratePerKm || 0).toFixed(2),
      amt: distanceFare.toLocaleString('en-IN', { minimumFractionDigits: 2 })
    },
    {
      no: '2',
      desc: 'Driver Daily Bata / Allowance (Day Duty)',
      details: `${billData.driverBataDays || 1} Day(s)`,
      rate: Number(billData.driverBata || 0).toFixed(2),
      amt: totalBata.toLocaleString('en-IN', { minimumFractionDigits: 2 })
    },
    {
      no: '3',
      desc: 'Night Halting Bata (10:00 PM to 06:00 AM)',
      details: `${billData.nightBataDays || 0} Night(s)`,
      rate: Number(billData.nightBataRate || 0).toFixed(2),
      amt: nightBata.toLocaleString('en-IN', { minimumFractionDigits: 2 })
    },
    {
      no: '4',
      desc: 'Toll Plaza & Parking Charges (At Actuals)',
      details: 'Actuals',
      rate: '-',
      amt: tollAmt.toLocaleString('en-IN', { minimumFractionDigits: 2 })
    },
    {
      no: '5',
      desc: 'Permit / Hill Station / Extra Allowance',
      details: billData.waitingDetails || '-',
      rate: '-',
      amt: (waitingAmt + permitAmt).toLocaleString('en-IN', { minimumFractionDigits: 2 })
    }
  ];

  items.forEach((item, idx) => {
    doc.setFillColor(idx % 2 === 0 ? 255 : 250, idx % 2 === 0 ? 255 : 248, idx % 2 === 0 ? 255 : 244);
    doc.rect(12, y, 186, 7.5, 'F');
    doc.setDrawColor(...borderCream);
    doc.rect(12, y, 186, 7.5);

    doc.setTextColor(...darkText);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.text(item.no, 17, y + 5);
    doc.text(item.desc, 32, y + 5);
    doc.text(item.details, 120, y + 5, { align: 'center' });
    doc.text(item.rate, 154, y + 5, { align: 'right' });
    doc.setFont('helvetica', 'bold');
    doc.text(item.amt, 194, y + 5, { align: 'right' });
    y += 7.5;
  });

  // Amount in Words Banner
  y += 2;
  doc.setFillColor(...bgCream);
  doc.setDrawColor(...borderCream);
  doc.rect(12, y, 186, 8, 'FD');
  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...emeraldDark);
  doc.text('Amount in Words:', 16, y + 5.2);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...darkText);
  doc.text(numberToWords(totalFare), 45, y + 5.2);

  // 6. Payment Summary & Balance Settlement Grid
  y += 11;
  const summaryY = y;
  doc.setFillColor(...bgCream);
  doc.setDrawColor(...borderCream);
  doc.rect(12, summaryY, 186, 38, 'FD');
  doc.line(105, summaryY, 105, summaryY + 38);

  // Left: Payment Mode & UPI settlement
  doc.setTextColor(...emeraldDark);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.text('PAYMENT MODE & SETTLEMENT', 16, summaryY + 6);

  const mode = billData.paymentMode || 'UPI';
  doc.setFontSize(7.5);
  doc.setTextColor(...darkText);
  doc.text(
    `[${mode.includes('UPI') || mode === 'Online' ? 'X' : ' '}] Google Pay / PhonePe / UPI      [${mode === 'Cash' ? 'X' : ' '}] Cash      [${mode === 'Bank' ? 'X' : ' '}] Bank Transfer`,
    16,
    summaryY + 13
  );

  doc.setTextColor(...grayText);
  doc.setFont('helvetica', 'normal');
  doc.text('Official UPI ID for Payment:', 16, summaryY + 20);
  doc.setTextColor(...emeraldDark);
  doc.setFont('helvetica', 'bold');
  doc.text(`${billData.upiId || '9894116405@okaxis'}  (Nithamudayar Travels)`, 16, summaryY + 24.5);

  doc.setTextColor(...grayText);
  doc.setFont('helvetica', 'normal');
  doc.text('For RTGS / NEFT transfer, kindly contact office billing desk.', 16, summaryY + 31);

  // Right: Calculations Breakdown
  doc.setFontSize(8);
  doc.setTextColor(...grayText);
  doc.text('Total Trip Amount:', 110, summaryY + 7);
  doc.setTextColor(...darkText);
  doc.setFont('helvetica', 'bold');
  doc.text(`Rs. ${totalFare.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`, 194, summaryY + 7, { align: 'right' });

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...grayText);
  doc.text('Advance Amount Paid:', 110, summaryY + 13.5);
  doc.setTextColor(...darkText);
  doc.setFont('helvetica', 'bold');
  doc.text(`Rs. ${advance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`, 194, summaryY + 13.5, { align: 'right' });

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...grayText);
  doc.text('Balance Due Payable:', 110, summaryY + 20);
  doc.setTextColor(190, 40, 40); // Alert red
  doc.setFont('helvetica', 'bold');
  doc.text(`Rs. ${balanceAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`, 194, summaryY + 20, { align: 'right' });

  // Solid Net Amount Banner
  doc.setFillColor(...emeraldDark);
  doc.rect(107, summaryY + 25, 89, 10, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.text('NET AMOUNT PAYABLE:', 111, summaryY + 31.5);
  doc.setTextColor(...goldPrimary);
  doc.setFontSize(10.5);
  doc.text(`Rs. ${totalFare.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`, 193, summaryY + 31.5, { align: 'right' });

  // 7. Terms & Signatures
  y = summaryY + 41;
  doc.setTextColor(...emeraldDark);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.text('TERMS & CONDITIONS:', 12, y);

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...grayText);
  doc.setFontSize(6.5);
  const terms = [
    '1. Toll charges, parking fees, interstate permit and hill taxes are payable at actuals unless explicitly inclusive.',
    '2. Kilometer and time calculations are garage-to-garage as per standard Tamil Nadu commercial travel regulations.',
    '3. Air conditioning (AC) will be switched off on steep ghat / uphill roads and during vehicle idling.',
    '4. Luggage and personal belongings are carried at owner\'s risk. Subject to Tamil Nadu jurisdiction.'
  ];
  terms.forEach((t, i) => {
    doc.text(t, 12, y + 4.5 + (i * 3.8));
  });

  // Dual Signatures
  const sigY = y + 24;
  doc.setDrawColor(...borderCream);
  doc.line(16, sigY, 70, sigY);
  doc.line(134, sigY, 190, sigY);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(...grayText);
  doc.text('Customer Signature', 43, sigY + 4, { align: 'center' });
  doc.text('(Service Satisfactory)', 43, sigY + 7.5, { align: 'center' });

  doc.setTextColor(...emeraldDark);
  doc.text('For NITHAMUDAYAR TOURS & TRAVELS', 162, sigY + 4, { align: 'center' });
  doc.setTextColor(...grayText);
  doc.text('(Authorized Signatory / Chauffeur)', 162, sigY + 7.5, { align: 'center' });

  // Bottom Courtesy Banner
  doc.setFillColor(...emeraldDark);
  doc.rect(9.5, 276, 191, 11, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.text('Thank you for traveling with Nithamudayar Tours & Travels! Wish you a safe and memorable journey.', 105, 281.5, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.5);
  doc.setTextColor(...goldLight);
  doc.text(`Computer Generated Travel Bill & Duty Slip • Customer Copy • 24x7 Customer Care: +91 ${contactPhone}`, 105, 285, { align: 'center' });

  return doc;
}

/**
 * Downloads the vector PDF with multi-layer browser fallback (direct download + anchor trigger + blob window).
 */
export function downloadVectorBillPdf(billData, calculations, settings) {
  try {
    const doc = generateVectorBillPdf(billData, calculations, settings);
    const sanitizedName = (billData.customerName || 'Customer').replace(/[^a-zA-Z0-9_-]/g, '_');
    const fileName = `${billData.billNo || 'TRIP_BILL'}_${sanitizedName}.pdf`;

    // 1. Try native jsPDF save
    try {
      doc.save(fileName);
      return true;
    } catch (saveErr) {
      console.warn('doc.save failed, trying Blob download link:', saveErr);
    }

    // 2. Fallback: Blob URL + Anchor download
    const blob = doc.output('blob');
    const blobUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    setTimeout(() => {
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
    }, 1000);

    return true;
  } catch (error) {
    console.error('Fatal error generating vector PDF:', error);
    throw error;
  }
}
