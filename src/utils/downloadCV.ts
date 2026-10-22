import { jsPDF } from 'jspdf';
import {
  PERSONAL_INFO,
  EXPERIENCES,
  SKILLS,
  EDUCATION,
  CERTIFICATIONS,
  LANGUAGES,
} from '../data/portfolioData';

/**
 * Downloads Fahad Razzaq's Executive CV as a high-quality PDF.
 * Uses a pre-generated static PDF asset with automatic client-side jsPDF fallback.
 */
export async function downloadExecutiveCV(): Promise<void> {
  const fileName = 'Fahad_Razzaq_Executive_CV.pdf';
  const pdfUrl = '/assets/aistudio/Fahad_Pak_Cv_daa15f95.pdf';

  try {
    // Fetch blob and trigger direct download
    const res = await fetch(pdfUrl);
    if (res.ok) {
      const blob = await res.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => window.URL.revokeObjectURL(blobUrl), 2000);
      return;
    }
  } catch {
    // direct anchor fallback
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = fileName;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return;
  }

  // Fallback: Generate pristine PDF client-side using jsPDF
  try {
    generateClientPDF(fileName);
  } catch (error) {
    console.error('Failed to generate PDF:', error);
    window.open(pdfUrl, '_blank');
  }
}

/**
 * Client-side jsPDF generator for reliable offline / iframe PDF creation.
 */
export function generateClientPDF(fileName = 'Fahad_Razzaq_Executive_CV.pdf'): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 18;
  const contentWidth = pageWidth - margin * 2;
  let y = 18;

  // Header background bar (Luxury Navy)
  doc.setFillColor(6, 20, 38);
  doc.rect(0, 0, pageWidth, 42, 'F');

  // Gold accent strip
  doc.setFillColor(201, 162, 39);
  doc.rect(0, 42, pageWidth, 2.5, 'F');

  // Header Text
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.text(PERSONAL_INFO.name.toUpperCase(), margin, 18);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10.5);
  doc.setTextColor(201, 162, 39);
  doc.text(PERSONAL_INFO.title.toUpperCase(), margin, 25);

  doc.setFontSize(8.5);
  doc.setTextColor(210, 220, 235);
  doc.text(
    `${PERSONAL_INFO.location}  |  ${PERSONAL_INFO.phone}  |  ${PERSONAL_INFO.email}  |  ${PERSONAL_INFO.linkedinDisplay}`,
    margin,
    34
  );

  y = 52;

  function checkPage(needed: number) {
    if (y + needed > 275) {
      doc.addPage();
      y = 20;
    }
  }

  function addSectionTitle(title: string) {
    checkPage(14);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(6, 20, 38);
    doc.text(title.toUpperCase(), margin, y);

    doc.setDrawColor(201, 162, 39);
    doc.setLineWidth(0.8);
    doc.line(margin, y + 2, margin + contentWidth, y + 2);
    y += 8;
  }

  // Executive Summary
  addSectionTitle('Executive Summary');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(50, 50, 50);
  const splitSummary = doc.splitTextToSize(PERSONAL_INFO.summaryParagraph1, contentWidth);
  doc.text(splitSummary, margin, y);
  y += splitSummary.length * 4.2 + 6;

  // Core Competencies
  addSectionTitle('Core Competencies & Capabilities');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(30, 40, 60);

  const skillNames = SKILLS.map((s) => s.name);
  for (let i = 0; i < skillNames.length; i += 2) {
    checkPage(6);
    doc.setFillColor(201, 162, 39);
    doc.circle(margin + 2, y - 1, 1, 'F');
    doc.text(skillNames[i], margin + 6, y);

    if (skillNames[i + 1]) {
      doc.circle(margin + contentWidth / 2 + 2, y - 1, 1, 'F');
      doc.text(skillNames[i + 1], margin + contentWidth / 2 + 6, y);
    }
    y += 5;
  }
  y += 4;

  // Professional Experience
  addSectionTitle('Professional Experience');

  EXPERIENCES.forEach((exp) => {
    checkPage(24);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(6, 20, 38);
    doc.text(exp.role, margin, y);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(100, 100, 100);
    doc.text(exp.period, margin + contentWidth - doc.getTextWidth(exp.period), y);
    y += 4.5;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(201, 162, 39);
    const companyLine = `${exp.company} — ${exp.location}${exp.project ? ` (${exp.project})` : ''}`;
    doc.text(companyLine, margin, y);
    y += 4.5;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.2);
    doc.setTextColor(60, 60, 60);

    exp.bullets.forEach((b) => {
      checkPage(8);
      const splitB = doc.splitTextToSize(`•  ${b}`, contentWidth - 4);
      doc.text(splitB, margin + 2, y);
      y += splitB.length * 3.8 + 1;
    });
    y += 3;
  });

  // Education & Certifications
  checkPage(30);
  addSectionTitle('Education & Certifications');

  EDUCATION.forEach((edu, idx) => {
    const xPos = idx === 0 ? margin : margin + contentWidth / 2;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(6, 20, 38);
    doc.text(edu.degree, xPos, y);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(80, 80, 80);
    doc.text(`${edu.institution} (${edu.period})`, xPos, y + 4);
  });

  y += 11;

  CERTIFICATIONS.forEach((cert, idx) => {
    const xPos = idx === 0 ? margin : margin + contentWidth / 2;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(6, 20, 38);
    doc.text(cert.title, xPos, y);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(80, 80, 80);
    doc.text(`${cert.issuer} (${cert.date})`, xPos, y + 4);
  });

  y += 11;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(6, 20, 38);
  doc.text('Languages:', margin, y);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(80, 80, 80);
  doc.text(LANGUAGES.map((l) => `${l.language} (${l.level})`).join('  ·  '), margin + 25, y);

  // Trigger download directly via Blob URL
  doc.save(fileName);
}
