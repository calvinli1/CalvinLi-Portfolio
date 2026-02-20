import { useState, useRef, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Set up the PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PdfViewerProps {
    file: string;
    className?: string;
}

export default function PdfViewer({ file, className = '' }: PdfViewerProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [containerWidth, setContainerWidth] = useState<number>(0);

    useEffect(() => {
        const updateWidth = () => {
            if (containerRef.current) {
                setContainerWidth(containerRef.current.offsetWidth);
            }
        };

        updateWidth();
        window.addEventListener('resize', updateWidth);
        return () => window.removeEventListener('resize', updateWidth);
    }, []);

    return (
        <div ref={containerRef} className={`w-full ${className}`}>
            {containerWidth > 0 && (
                <Document
                    file={file}
                    loading={
                        <div className="flex items-center justify-center py-20">
                            <div className="w-8 h-8 border-2 border-cyber-electric border-t-transparent rounded-full animate-spin" />
                        </div>
                    }
                >
                    <Page
                        pageNumber={1}
                        width={containerWidth}
                        renderTextLayer={false}
                        renderAnnotationLayer={false}
                    />
                </Document>
            )}
        </div>
    );
}
