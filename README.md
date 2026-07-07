# 🚀 AI-Powered Resume Builder

A modern, responsive, and privacy-first resume builder that leverages Groq's blazing-fast AI to extract data from your old resumes (PDF or Word) and instantly generate beautifully crafted, professional resume templates. Built with React and Vite.

## ✨ Features

- **Instant AI Extraction:** Upload an old PDF or Word Doc and let the Groq LLM intelligently parse and organize your experience, education, and skills.
- **Multiple Premium Templates:** Choose from over a dozen beautifully designed templates ranging from Corporate Minimalist to Creative Modern.
- **Real-Time Live Preview:** See exactly what your resume looks like as you type, perfectly scaled to fit your screen.
- **A4 PDF Export:** Generates flawless, un-cut, high-resolution PDFs perfectly formatted for standard printing or digital distribution.
- **Customization Engine:** Tweak primary colors, typography, line spacing, margins, and custom sections natively.
- **Privacy First:** Data is processed and saved entirely in your browser's local storage.

## 🛠 Tech Stack

- **Frontend Framework:** React 19 + Vite
- **Styling:** Vanilla CSS & Inline Styling Framework
- **Animations:** Framer Motion
- **AI Integration:** Groq SDK via REST
- **PDF Engine:** html2canvas + jsPDF
- **Document Parsing:** pdf.js & Mammoth (for .docx parsing)
- **Icons:** Lucide React

## 🚀 Quick Start

### 1. Clone the repository
```bash
git clone https://github.com/your-username/resume-builder.git
cd resume-builder
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Setup
Create a `.env` file in the root directory and add your Groq API key (used for the resume parsing feature).
```env
VITE_GROQ_API_KEY=your_groq_api_key_here
```
*(Get a free API key at [console.groq.com](https://console.groq.com/keys))*

### 4. Run the development server
```bash
npm run dev
```
Navigate to `http://localhost:5173` to start building!

## 📦 Deployment

The application is completely static and ready to be deployed to Vercel, Netlify, or Cloudflare Pages.

1. Build the app:
```bash
npm run build
```
2. **Note on Routing:** A `_redirects` file is included in `/public` to ensure React Router client-side routing works cleanly across page refreshes on platforms like Netlify.

> **⚠️ Security Warning:**
> The `VITE_GROQ_API_KEY` is bundled in the client code for ease of setup. If you plan to deploy this app to production, it is highly recommended to move the AI extraction logic into a Serverless Backend function to protect your API key from being exposed.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!
1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
