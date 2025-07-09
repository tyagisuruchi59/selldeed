# 🧾 Sale Deed Website

This project generates a downloadable **Sale Deed PDF** by taking user input from a simple form and inserting it into a predefined HTML template.

## 🚀 Features

- Form with the following fields:
  - Full Name
  - Father's Name
  - Property Size (sq.ft.)
  - Sale Amount (₹)
  - Date
- On form submission:
  - Data is inserted into an HTML sale deed template using placeholders like `{{name}}`, `{{sale_amount}}`, etc.
  - The filled HTML is converted to a PDF and downloaded by the user.
- Built with **Node.js** and uses tools like **Puppeteer** or **html-pdf** to generate PDFs.

## 📦 Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd sale-deed-website
