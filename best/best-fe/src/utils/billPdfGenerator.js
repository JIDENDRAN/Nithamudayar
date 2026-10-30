import jsPDF from 'jspdf';
import { NITHAM_LOGO_BASE64 } from '../assets/logoBase64';

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
 * Core unified vector renderer that draws the official invoice onto any target:
 * jsPDF document instance or HTML5 Canvas adapter.
 */
function renderBillDocument(d, billData, calculations, settings) {
  const {
    distanceFare = 0,
    dailyRentTotal = 0,
    totalBata = 0,
    nightBata = 0,
    waitingAmt = 0,
    tollAmt = 0,
    permitAmt = 0,
    totalFare = 0,
    advance = 0,
    balanceAmount = 0
  } = calculations || {};

  // Theme Palette: Royal Midnight Navy & Heritage Champagne Gold (Exact Logo Colors)
  const navyDark = [27, 32, 61];        // #1b203d (Dominant Midnight Navy from official logo)
  const goldPrimary = [212, 175, 55];    // #d4af37 (Regal Champagne Gold from temple illustration)
  const goldLight = [253, 248, 225];
  const bgCream = [250, 248, 243];
  const borderCream = [225, 218, 205];
  const darkText = [30, 25, 20];
  const grayText = [100, 95, 90];

  // 1. Outer Double Border Frame (Professional Executive Invoice Look)
  d.setDrawColor(...navyDark);
  d.setLineWidth(0.4);
  d.rect(8, 8, 194, 281);
  d.setLineWidth(0.15);
  d.rect(9.5, 9.5, 191, 278);

  // 2. Top Header Area (Spacious & Overlap-Free)
  const headerY = 9.5;
  const headerHeight = 31.5;
  d.setFillColor(...navyDark);
  d.rect(9.5, headerY, 191, headerHeight, 'F');

  // Official Temple Emblem (Midnight Navy & Champagne Gold)
  const logoSize = 26.5;
  const logoX = 11.5;
  const logoY = headerY + 2.5;
  d.setFillColor(15, 18, 35);
  d.setDrawColor(...goldPrimary);
  d.setLineWidth(0.4);
  d.roundedRect(logoX, logoY, logoSize, logoSize, 1.5, 1.5, 'FD');
  try {
    d.addImage(NITHAM_LOGO_BASE64, 'PNG', logoX, logoY, logoSize, logoSize, 'LOGO', 'NONE');
  } catch (err) {
    console.warn('Logo render skipped:', err);
  }

  // Header Right Badge: INVOICE / DUTY SLIP (Anchored on the right)
  const badgeX = 143;
  const badgeY = headerY + 2.8;
  const badgeWidth = 53.5;
  const badgeHeight = 25.5;
  d.setFillColor(...goldPrimary);
  d.roundedRect(badgeX, badgeY, badgeWidth, badgeHeight, 1.5, 1.5, 'F');

  const badgeCenterX = badgeX + (badgeWidth / 2);
  d.setTextColor(...navyDark);
  d.setFont('helvetica', 'bold');
  d.setFontSize(8.5);
  d.text('TRIP INVOICE & DUTY SLIP', badgeCenterX, badgeY + 6.2, { align: 'center' });

  d.setDrawColor(...navyDark);
  d.setLineWidth(0.2);
  d.line(badgeX + 6, badgeY + 8.5, badgeX + badgeWidth - 6, badgeY + 8.5);

  d.setFontSize(7.8);
  d.setFont('helvetica', 'bold');
  d.text(`Bill No: ${billData.billNo || 'NTT-2026-0001'}`, badgeCenterX, badgeY + 13.5, { align: 'center' });

  d.setFont('helvetica', 'normal');
  d.setFontSize(7.2);
  d.text(`Date: ${billData.date || new Date().toLocaleDateString('en-GB')}`, badgeCenterX, badgeY + 18.2, { align: 'center' });
  d.setFontSize(6.8);
  d.text(`Time: ${billData.time || '12:00 PM'}`, badgeCenterX, badgeY + 22.5, { align: 'center' });

  // Company Information (Left Side, with strict maxWidth to avoid badge overlap)
  const textLeftX = logoX + logoSize + 3; // 41mm
  const textMaxWidth = badgeX - textLeftX - 3; // ~99mm safe width

  d.setTextColor(255, 255, 255);
  d.setFont('helvetica', 'bold');
  d.setFontSize(11);
  const companyName = (billData.cabServiceName || settings?.name || 'NITHAMUDAYAR TOURS & TRAVELS PVT LTD').toUpperCase();
  d.text(companyName, textLeftX, headerY + 8, { maxWidth: textMaxWidth });

  d.setFont('helvetica', 'normal');
  d.setFontSize(7.2);
  d.setTextColor(...goldLight);
  d.text('Premium Luxury Fleet • Force Urbania • Innova Crysta • Tempo Traveller', textLeftX, headerY + 14, { maxWidth: textMaxWidth });

  d.setTextColor(235, 235, 235);
  d.setFontSize(6.8);
  d.text('Melawasthachavadi, Abinaya Grand, Pudukkottai Rd, Thanjavur - 613005', textLeftX, headerY + 19.5, { maxWidth: textMaxWidth });

  d.setTextColor(...goldLight);
  d.setFontSize(6.8);
  d.text('24x7 Customer Care: +91 98941 16405 / +91 96261 16405', textLeftX, headerY + 25, { maxWidth: textMaxWidth });

  // 3. Build Items List to Determine Dynamic Row Count
  const items = [];
  let sNo = 1;

  if (dailyRentTotal > 0) {
    items.push({
      no: String(sNo++),
      desc: 'Daily Base Rent / Vehicle Hire Charges',
      details: `${billData.dailyRentDays || 1} Day(s)`,
      rate: Number(billData.dailyRentRate || 0).toFixed(2),
      amt: dailyRentTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })
    });
  }

  const billedKm = billData.distanceKm || 0;
  if (distanceFare > 0 || (dailyRentTotal === 0 && billedKm > 0)) {
    items.push({
      no: String(sNo++),
      desc: 'Base Kilometre Running Charges',
      details: `${billedKm} KM`,
      rate: Number(billData.ratePerKm || 0).toFixed(2),
      amt: distanceFare.toLocaleString('en-IN', { minimumFractionDigits: 2 })
    });
  }

  if (totalBata > 0) {
    items.push({
      no: String(sNo++),
      desc: 'Driver Daily Bata / Allowance (Day Duty)',
      details: `${billData.driverBataDays || 1} Day(s)`,
      rate: Number(billData.driverBata || 0).toFixed(2),
      amt: totalBata.toLocaleString('en-IN', { minimumFractionDigits: 2 })
    });
  }

  if (nightBata > 0) {
    items.push({
      no: String(sNo++),
      desc: 'Night Halting Bata (10:00 PM to 06:00 AM)',
      details: `${billData.nightBataDays || 1} Night(s)`,
      rate: Number(billData.nightBataRate || 0).toFixed(2),
      amt: nightBata.toLocaleString('en-IN', { minimumFractionDigits: 2 })
    });
  }

  if (tollAmt > 0) {
    items.push({
      no: String(sNo++),
      desc: 'Toll Plaza & Parking Charges (At Actuals)',
      details: 'Actuals',
      rate: '-',
      amt: tollAmt.toLocaleString('en-IN', { minimumFractionDigits: 2 })
    });
  }

  if ((waitingAmt + permitAmt) > 0) {
    items.push({
      no: String(sNo++),
      desc: 'Permit / Hill Station / Extra Allowance',
      details: billData.waitingDetails || '-',
      rate: '-',
      amt: (waitingAmt + permitAmt).toLocaleString('en-IN', { minimumFractionDigits: 2 })
    });
  }

  if (items.length === 0) {
    items.push({
      no: '1',
      desc: 'Commercial Cab Travel Service Charges',
      details: '1 Trip',
      rate: Number(totalFare || 0).toFixed(2),
      amt: Number(totalFare || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })
    });
  }

  // 4. Dynamic Vertical Rhythm Budget
  const footerHeight = 13.5;
  const footerY = 287.5 - footerHeight; // 274mm
  const contentStartY = headerY + headerHeight; // 41mm

  const cardsHeight = 36;
  const odoHeight = 14;
  const tableHeaderHeight = 7.5;
  const rowHeight = items.length <= 3 ? 9 : (items.length <= 4 ? 8.2 : 7.2);
  const tableRowsHeight = items.length * rowHeight;
  const wordsHeight = 8;
  const paymentHeight = 38;
  const termsHeight = 20;

  const fixedContentSum = cardsHeight + odoHeight + tableHeaderHeight + tableRowsHeight + wordsHeight + paymentHeight + termsHeight;
  const totalAvailable = footerY - contentStartY;
  const remainingForSigAndGaps = totalAvailable - fixedContentSum;
  const sigHeight = Math.min(36, Math.max(26, remainingForSigAndGaps * 0.38));
  const remainingForGaps = remainingForSigAndGaps - sigHeight;
  const gap = Math.min(7, Math.max(3, remainingForGaps / 7));

  // 5. Customer & Vehicle Grid (Dual Cards)
  let curY = contentStartY + gap;
  const cardWidth = 91;
  const leftCardX = 11;
  const rightCardX = 107;

  // Left Card: Customer Details
  d.setFillColor(...bgCream);
  d.setDrawColor(...borderCream);
  d.roundedRect(leftCardX, curY, cardWidth, cardsHeight, 1.5, 1.5, 'FD');
  d.setFillColor(...navyDark);
  d.rect(leftCardX, curY, cardWidth, 6, 'F');
  d.setTextColor(255, 255, 255);
  d.setFont('helvetica', 'bold');
  d.setFontSize(7.5);
  d.text('CUSTOMER / PASSENGER DETAILS', leftCardX + 4, curY + 4.2);

  const cardRowH = (cardsHeight - 8) / 4;
  const custLabels = [
    { label: 'Customer Name:', val: billData.customerName || 'Walk-in Guest' },
    { label: 'Contact No:', val: billData.phone || '+91 98941 16405' },
    { label: 'Pickup From:', val: (billData.fromLocation || 'Pickup Point').slice(0, 32) },
    { label: 'Drop / Route:', val: (billData.toLocation || 'Destination').slice(0, 32) }
  ];

  custLabels.forEach((r, idx) => {
    const rowY = curY + 9.5 + (idx * cardRowH);
    d.setTextColor(...grayText);
    d.setFont('helvetica', 'normal');
    d.setFontSize(7.2);
    d.text(r.label, leftCardX + 4, rowY);
    d.setTextColor(...darkText);
    d.setFont('helvetica', 'bold');
    d.text(r.val, leftCardX + 32, rowY, { maxWidth: cardWidth - 34 });
  });

  // Right Card: Vehicle & Chauffeur
  d.setFillColor(...bgCream);
  d.setDrawColor(...borderCream);
  d.roundedRect(rightCardX, curY, cardWidth, cardsHeight, 1.5, 1.5, 'FD');
  d.setFillColor(...navyDark);
  d.rect(rightCardX, curY, cardWidth, 6, 'F');
  d.setTextColor(255, 255, 255);
  d.setFont('helvetica', 'bold');
  d.setFontSize(7.5);
  d.text('VEHICLE & CHAUFFEUR PARTICULARS', rightCardX + 4, curY + 4.2);

  const vehLabels = [
    { label: 'Vehicle Model:', val: billData.vehicleModel || 'Commercial Cab' },
    { label: 'Registration No:', val: billData.vehicleNo ? String(billData.vehicleNo).toUpperCase() : 'TN 49 AB 2026' },
    { label: 'Chauffeur Name:', val: billData.driverName || 'Professional Chauffeur' },
    {
      label: dailyRentTotal > 0 ? 'Daily Base Rent:' : 'Trip Nature:',
      val: dailyRentTotal > 0
        ? `${billData.dailyRentDays} Day(s) @ Rs. ${Number(billData.dailyRentRate || 0).toLocaleString('en-IN')}/day`
        : (billData.tripType || 'Outstation Round Trip')
    }
  ];

  vehLabels.forEach((r, idx) => {
    const rowY = curY + 9.5 + (idx * cardRowH);
    d.setTextColor(...grayText);
    d.setFont('helvetica', 'normal');
    d.setFontSize(7.2);
    d.text(r.label, rightCardX + 4, rowY);
    d.setTextColor(...darkText);
    d.setFont('helvetica', 'bold');
    d.text(r.val, rightCardX + 34, rowY, { maxWidth: cardWidth - 36 });
  });

  // 6. Trip Duty Meter / Odometer Bar
  curY += cardsHeight + gap;
  d.setFillColor(243, 239, 231);
  d.setDrawColor(...borderCream);
  d.roundedRect(11, curY, 187, odoHeight, 1.5, 1.5, 'FD');

  const openingKm = billData.openingKm || 14500;
  const closingKm = billData.closingKm || (Number(openingKm) + Number(billedKm));
  const odoCols = [
    { label: 'OPENING KM', val: `${Number(openingKm).toLocaleString()} KM` },
    { label: 'CLOSING KM', val: `${Number(closingKm).toLocaleString()} KM` },
    { label: 'TOTAL RUN', val: `${billedKm} KM` },
    { label: 'BILLED KM', val: `${billedKm} KM` },
    { label: 'RATE / KM', val: Number(billData.ratePerKm) > 0 ? `Rs. ${billData.ratePerKm} / KM` : (dailyRentTotal > 0 ? 'Nil / Incl' : 'Rs. 0') }
  ];

  const colW = 187 / 5;
  odoCols.forEach((col, idx) => {
    const colCenterX = 11 + (idx * colW) + (colW / 2);
    if (idx > 0) {
      d.setDrawColor(...borderCream);
      d.line(11 + (idx * colW), curY, 11 + (idx * colW), curY + odoHeight);
    }
    d.setFontSize(6.8);
    d.setTextColor(...grayText);
    d.setFont('helvetica', 'bold');
    d.text(col.label, colCenterX, curY + 4.8, { align: 'center' });

    d.setFontSize(8.5);
    d.setTextColor(...navyDark);
    d.text(col.val, colCenterX, curY + 10.5, { align: 'center' });
  });

  // 7. Itemized Charges Table
  curY += odoHeight + gap;
  const tableX = 11;
  const tableW = 187;

  // Header
  d.setFillColor(...navyDark);
  d.rect(tableX, curY, tableW, tableHeaderHeight, 'F');
  d.setTextColor(255, 255, 255);
  d.setFont('helvetica', 'bold');
  d.setFontSize(7.5);
  d.text('S.NO', tableX + 7, curY + 5, { align: 'center' });
  d.text('PARTICULARS / SERVICE DESCRIPTION', tableX + 22, curY + 5);
  d.text('QTY / DETAILS', tableX + 118, curY + 5, { align: 'center' });
  d.text('RATE (Rs.)', tableX + 152, curY + 5, { align: 'right' });
  d.text('AMOUNT (Rs.)', tableX + tableW - 4, curY + 5, { align: 'right' });

  curY += tableHeaderHeight;

  items.forEach((item, idx) => {
    d.setFillColor(idx % 2 === 0 ? 255 : 250, idx % 2 === 0 ? 255 : 248, idx % 2 === 0 ? 255 : 244);
    d.rect(tableX, curY, tableW, rowHeight, 'F');
    d.setDrawColor(...borderCream);
    d.rect(tableX, curY, tableW, rowHeight);

    const midY = curY + (rowHeight / 2) + 1.2;
    d.setTextColor(...darkText);
    d.setFont('helvetica', 'normal');
    d.setFontSize(7.5);
    d.text(item.no, tableX + 7, midY, { align: 'center' });
    d.text(item.desc, tableX + 22, midY);
    d.text(item.details, tableX + 118, midY, { align: 'center' });
    d.text(item.rate, tableX + 152, midY, { align: 'right' });
    d.setFont('helvetica', 'bold');
    d.text(item.amt, tableX + tableW - 4, midY, { align: 'right' });

    curY += rowHeight;
  });

  // Amount in Words Banner
  curY += gap * 0.4;
  d.setFillColor(...bgCream);
  d.setDrawColor(...borderCream);
  d.roundedRect(tableX, curY, tableW, wordsHeight, 1, 1, 'FD');
  const wordsMidY = curY + (wordsHeight / 2) + 1.2;
  d.setFontSize(7.5);
  d.setFont('helvetica', 'bold');
  d.setTextColor(...navyDark);
  d.text('AMOUNT IN WORDS:', tableX + 4, wordsMidY);
  d.setFont('helvetica', 'normal');
  d.setTextColor(...darkText);
  d.text(numberToWords(totalFare), tableX + 38, wordsMidY, { maxWidth: tableW - 42 });

  // 8. Payment Summary & Settlement Grid
  curY += wordsHeight + gap;
  const summaryY = curY;
  d.setFillColor(...bgCream);
  d.setDrawColor(...borderCream);
  d.roundedRect(tableX, summaryY, tableW, paymentHeight, 1.5, 1.5, 'FD');
  const splitX = tableX + 94;
  d.line(splitX, summaryY, splitX, summaryY + paymentHeight);

  // Left: Payment Mode & UPI ID
  d.setTextColor(...navyDark);
  d.setFont('helvetica', 'bold');
  d.setFontSize(8);
  d.text('PAYMENT MODE & SETTLEMENT', tableX + 4, summaryY + 6);

  const mode = billData.paymentMode || 'UPI';
  d.setFontSize(7.5);
  d.setTextColor(...darkText);
  d.text(
    `[${mode.includes('UPI') || mode === 'Online' ? 'X' : ' '}] UPI / GPay      [${mode === 'Cash' ? 'X' : ' '}] Cash      [${mode === 'Bank' ? 'X' : ' '}] Bank Transfer`,
    tableX + 4,
    summaryY + 13
  );

  d.setTextColor(...grayText);
  d.setFont('helvetica', 'normal');
  d.setFontSize(7);
  d.text('Official UPI ID for Payment:', tableX + 4, summaryY + 19.5);

  d.setFillColor(255, 255, 255);
  d.setDrawColor(...goldPrimary);
  d.roundedRect(tableX + 4, summaryY + 21.5, splitX - tableX - 8, 7.5, 1, 1, 'FD');
  d.setTextColor(...navyDark);
  d.setFont('helvetica', 'bold');
  d.setFontSize(7.5);
  d.text(billData.upiId || '9894116405@okaxis', tableX + 7, summaryY + 26.5);

  d.setTextColor(...grayText);
  d.setFont('helvetica', 'normal');
  d.setFontSize(6.8);
  d.text('For RTGS / NEFT transfer, kindly contact office billing desk.', tableX + 4, summaryY + 34);

  // Right: Calculations Breakdown & Net Amount Banner
  d.setFontSize(7.8);
  d.setTextColor(...grayText);
  let calcY = summaryY + 7;
  d.text('Total Trip Amount:', splitX + 5, calcY);
  d.setTextColor(...darkText);
  d.setFont('helvetica', 'bold');
  d.text(`Rs. ${totalFare.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`, tableX + tableW - 4, calcY, { align: 'right' });

  if (advance > 0) {
    calcY += 6;
    d.setFont('helvetica', 'normal');
    d.setTextColor(...grayText);
    d.text('Advance Paid:', splitX + 5, calcY);
    d.setTextColor(26, 120, 60);
    d.setFont('helvetica', 'bold');
    d.text(`Rs. ${advance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`, tableX + tableW - 4, calcY, { align: 'right' });

    calcY += 6;
    d.setFont('helvetica', 'normal');
    d.setTextColor(...grayText);
    d.text('Balance Due:', splitX + 5, calcY);
    d.setTextColor(190, 40, 40);
    d.setFont('helvetica', 'bold');
    d.text(`Rs. ${balanceAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`, tableX + tableW - 4, calcY, { align: 'right' });
  }

  // Solid Net Amount Banner
  const netBannerH = 10;
  const netBannerY = summaryY + paymentHeight - netBannerH - 1.5;
  d.setFillColor(...navyDark);
  d.roundedRect(splitX + 2, netBannerY, tableW - 94 - 4, netBannerH, 1, 1, 'F');
  d.setTextColor(255, 255, 255);
  d.setFont('helvetica', 'bold');
  d.setFontSize(8);
  d.text('NET AMOUNT PAYABLE:', splitX + 5, netBannerY + 6.5);
  d.setTextColor(...goldPrimary);
  d.setFontSize(10.5);
  d.text(`Rs. ${totalFare.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`, tableX + tableW - 5, netBannerY + 6.8, { align: 'right' });

  // 9. Terms & Conditions
  curY += paymentHeight + gap;
  d.setTextColor(...navyDark);
  d.setFont('helvetica', 'bold');
  d.setFontSize(7.5);
  d.text('TERMS & CONDITIONS:', tableX, curY + 3.5);

  d.setFont('helvetica', 'normal');
  d.setTextColor(...grayText);
  d.setFontSize(6.8);
  const terms = [
    '1. Toll charges, parking fees, interstate permit and hill taxes are payable at actuals unless explicitly inclusive.',
    '2. Kilometer and time calculations are garage-to-garage as per standard Tamil Nadu commercial travel regulations.',
    '3. Air conditioning (AC) will be switched off on steep ghat / uphill roads and during vehicle idling.',
    '4. Luggage and personal belongings are carried at owner\'s risk. Subject to Tamil Nadu jurisdiction.'
  ];
  terms.forEach((t, i) => {
    d.text(t, tableX, curY + 8 + (i * 3.8));
  });

  // 10. Duty Acceptance & Dual Signatures Block
  curY += termsHeight + gap;
  const sigLineY = curY + (sigHeight * 0.65);
  const leftSigStartX = tableX + 8;
  const leftSigEndX = tableX + 70;
  const rightSigStartX = tableX + tableW - 70;
  const rightSigEndX = tableX + tableW - 8;

  // Passenger confirmation declaration
  d.setFont('helvetica', 'italic');
  d.setFontSize(6.5);
  d.setTextColor(...grayText);
  d.text('I certify that the vehicle was engaged on duty and service was completed satisfactorily.', 105, curY + 3, { align: 'center' });

  // Signature lines
  d.setDrawColor(...borderCream);
  d.setLineWidth(0.3);
  d.line(leftSigStartX, sigLineY, leftSigEndX, sigLineY);
  d.line(rightSigStartX, sigLineY, rightSigEndX, sigLineY);

  const leftCenter = leftSigStartX + ((leftSigEndX - leftSigStartX) / 2);
  const rightCenter = rightSigStartX + ((rightSigEndX - rightSigStartX) / 2);

  d.setFont('helvetica', 'bold');
  d.setFontSize(7.2);
  d.setTextColor(...darkText);
  d.text('Customer Signature', leftCenter, sigLineY + 4.5, { align: 'center' });
  d.setFont('helvetica', 'normal');
  d.setFontSize(6.5);
  d.setTextColor(...grayText);
  d.text('(Service Satisfactory)', leftCenter, sigLineY + 8, { align: 'center' });

  d.setTextColor(...navyDark);
  d.setFont('helvetica', 'bold');
  d.setFontSize(7.2);
  d.text('For NITHAMUDAYAR TOURS & TRAVELS PVT LTD', rightCenter, sigLineY + 4.5, { align: 'center' });
  d.setTextColor(...grayText);
  d.setFont('helvetica', 'normal');
  d.setFontSize(6.5);
  d.text('(Authorized Signatory / Chauffeur)', rightCenter, sigLineY + 8, { align: 'center' });

  // 11. Bottom Courtesy Banner (Firmly Anchored to Bottom Inner Border)
  d.setFillColor(...navyDark);
  d.rect(9.5, footerY, 191, footerHeight, 'F');
  d.setTextColor(255, 255, 255);
  d.setFont('helvetica', 'bold');
  d.setFontSize(7.5);
  d.text('Thank you for traveling with Nithamudayar Tours & Travels Pvt Ltd! Wish you a safe and memorable journey.', 105, footerY + 5.5, { align: 'center' });
  d.setFont('helvetica', 'normal');
  d.setFontSize(6.8);
  d.setTextColor(...goldLight);
  d.text('Computer Generated Travel Bill & Duty Slip • Customer Copy • 24x7 Customer Care: +91 98941 16405 / +91 96261 16405', 105, footerY + 10, { align: 'center' });
}

/**
 * Creates a high-fidelity Canvas 2D adapter that implements the exact jsPDF drawing API.
 * Renders directly via the browser's native 2D canvas engine, eliminating any DOM / CSS squishing.
 */
function createCanvasRenderer(ctx, scale, logoImg) {
  const s = scale;
  return {
    fillColor: '#000000',
    strokeColor: '#000000',
    textColor: '#000000',
    fontStyle: 'normal',
    fontWeight: 'normal',
    ptSize: 10,
    setDrawColor(r, g, b) {
      this.strokeColor = `rgb(${r},${g},${b})`;
      ctx.strokeStyle = this.strokeColor;
    },
    setFillColor(r, g, b) {
      this.fillColor = `rgb(${r},${g},${b})`;
      ctx.fillStyle = this.fillColor;
    },
    setTextColor(r, g, b) {
      this.textColor = `rgb(${r},${g},${b})`;
    },
    setLineWidth(w) {
      ctx.lineWidth = Math.max(1, w * s);
    },
    setFont(family, weight) {
      this.fontWeight = (weight === 'bold' || weight === 'bolditalic') ? 'bold' : 'normal';
      this.fontStyle = (weight === 'italic' || weight === 'bolditalic') ? 'italic' : 'normal';
      this.updateFont();
    },
    setFontSize(pt) {
      this.ptSize = pt;
      this.updateFont();
    },
    updateFont() {
      // 1 pt in millimeters = 0.352778. At scale s, pixel size = pt * 0.352778 * s
      const px = Math.round(this.ptSize * 0.352778 * s);
      ctx.font = `${this.fontStyle} ${this.fontWeight} ${px}px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`;
    },
    rect(x, y, w, h, style) {
      if (style === 'F' || style === 'FD') {
        ctx.fillStyle = this.fillColor;
        ctx.fillRect(x * s, y * s, w * s, h * s);
      }
      if (!style || style === 'D' || style === 'FD') {
        ctx.strokeStyle = this.strokeColor;
        ctx.strokeRect(x * s, y * s, w * s, h * s);
      }
    },
    roundedRect(x, y, w, h, rx, ry, style) {
      const radius = (rx || 1.5) * s;
      ctx.beginPath();
      if (typeof ctx.roundRect === 'function') {
        ctx.roundRect(x * s, y * s, w * s, h * s, radius);
      } else {
        const X = x * s, Y = y * s, W = w * s, H = h * s, R = radius;
        ctx.moveTo(X + R, Y);
        ctx.lineTo(X + W - R, Y);
        ctx.quadraticCurveTo(X + W, Y, X + W, Y + R);
        ctx.lineTo(X + W, Y + H - R);
        ctx.quadraticCurveTo(X + W, Y + H, X + W - R, Y + H);
        ctx.lineTo(X + R, Y + H);
        ctx.quadraticCurveTo(X, Y + H, X, Y + H - R);
        ctx.lineTo(X, Y + R);
        ctx.quadraticCurveTo(X, Y, X + R, Y);
        ctx.closePath();
      }
      if (style === 'F' || style === 'FD') {
        ctx.fillStyle = this.fillColor;
        ctx.fill();
      }
      if (!style || style === 'D' || style === 'FD') {
        ctx.strokeStyle = this.strokeColor;
        ctx.stroke();
      }
    },
    line(x1, y1, x2, y2) {
      ctx.beginPath();
      ctx.strokeStyle = this.strokeColor;
      ctx.moveTo(x1 * s, y1 * s);
      ctx.lineTo(x2 * s, y2 * s);
      ctx.stroke();
    },
    text(str, x, y, options) {
      ctx.fillStyle = this.textColor;
      ctx.textAlign = options?.align || 'left';
      ctx.textBaseline = 'alphabetic';
      const textStr = String(str ?? '');
      if (options?.maxWidth) {
        ctx.fillText(textStr, x * s, y * s, options.maxWidth * s);
      } else {
        ctx.fillText(textStr, x * s, y * s);
      }
    },
    addImage(src, type, x, y, w, h) {
      if (logoImg && (logoImg.complete || logoImg.naturalWidth > 0)) {
        const dx = Math.round(x * s);
        const dy = Math.round(y * s);
        const dw = Math.round(w * s);
        const dh = Math.round(h * s);
        ctx.save();
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(logoImg, dx, dy, dw, dh);
        ctx.restore();
      }
    }
  };
}

/**
 * Generates an authentic vector PDF document.
 */
export function generateVectorBillPdf(billData, calculations, settings) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  renderBillDocument(doc, billData, calculations, settings);
  return doc;
}

/**
 * Generates an ultra-crisp, high-resolution Canvas of the exact vector invoice.
 * Completely immune to CSS transform squishing, font measurement bugs, or library parsing errors.
 */
export async function generateBillCanvas(billData, calculations, settings) {
  if (typeof document === 'undefined') {
    throw new Error('generateBillCanvas can only run in a browser environment');
  }

  const canvas = document.createElement('canvas');
  const s = 10; // 10 pixels per mm -> 2100 x 2970 px (Ultra-high 254 DPI clarity)
  canvas.width = Math.round(210 * s);
  canvas.height = Math.round(297 * s);
  const ctx = canvas.getContext('2d');
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';

  // Fill crisp white background
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Pre-load emblem image in memory
  let logoImg = null;
  if (NITHAM_LOGO_BASE64) {
    logoImg = new Image();
    await new Promise((resolve) => {
      const timer = setTimeout(resolve, 800);
      logoImg.onload = () => {
        clearTimeout(timer);
        resolve();
      };
      logoImg.onerror = () => {
        clearTimeout(timer);
        resolve();
      };
      logoImg.src = NITHAM_LOGO_BASE64;
      if (logoImg.complete && logoImg.naturalWidth > 0) {
        clearTimeout(timer);
        resolve();
      }
    });
  }

  const renderer = createCanvasRenderer(ctx, s, logoImg);
  renderBillDocument(renderer, billData, calculations, settings);

  return canvas;
}

/**
 * Downloads the vector bill directly as a crisp, full-page PNG image.
 */
export async function downloadVectorBillImage(billData, calculations, settings) {
  try {
    const canvas = await generateBillCanvas(billData, calculations, settings);
    const sanitizedName = (billData.customerName || 'Customer').replace(/[^a-zA-Z0-9_-]/g, '_');
    const fileName = `${billData.billNo || 'TRIP_BILL'}_${sanitizedName}.png`;

    const dataUrl = canvas.toDataURL('image/png', 1.0);
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    setTimeout(() => {
      document.body.removeChild(link);
    }, 1000);

    return true;
  } catch (error) {
    console.error('Fatal error generating vector bill image:', error);
    throw error;
  }
}

/**
 * Downloads the vector PDF with multi-layer browser fallback.
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
