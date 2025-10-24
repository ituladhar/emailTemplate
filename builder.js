// builder.js

document.addEventListener('DOMContentLoaded', () => {
    // A list of input elements and their corresponding preview elements/attributes
    const mappings = [
        // Header/Title
        { inputId: 'header-logo-input', previewId: 'preview-header-logo', attr: 'src' },
        { inputId: 'title-input', previewId: 'preview-title', attr: 'innerHTML' },
        { inputId: 'headline-input', previewId: 'preview-headline', attr: 'innerHTML' },

        // Call-to-Action (CTA)
        { inputId: 'cta-text-input', previewId: 'preview-cta', attr: 'innerHTML' },
        { inputId: 'cta-link-input', previewId: 'preview-cta', attr: 'href' },
        { inputId: 'cta-description-input', previewId: 'preview-cta-description', attr: 'innerHTML' },
        
        // Footer
        { inputId: 'footer-logo-input', previewId: 'preview-footer-logo', attr: 'src' },
        { inputId: 'footer-name-input', previewId: 'preview-footer-name', attr: 'innerHTML' },
        { inputId: 'footer-title-input', previewId: 'preview-footer-title', attr: 'innerHTML' },
        { inputId: 'footer-market-input', previewId: 'preview-footer-market', attr: 'innerHTML' },
    ];

    /**
     * Converts simple markdown-like syntax to HTML.
     * @param {string} text The raw text from the textarea.
     * @returns {string} The HTML string.
     */
    function processBodyContent(text) {
        // 1. Replace horizontal rule marker
        let html = text.replace(/---/g, '<div style="margin: 20px 0; border-top: 1px solid #e0e0e0;"></div>');

        // 2. Simple Markdown-style formatting (bold and italics)
        html = html.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>'); // **bold** -> <b>bold</b>
        html = html.replace(/\*(.*?)\*/g, '<i>$1</i>');     // *italics* -> <i>italics</i>
        
        // 3. Convert newlines to paragraphs (blocks of text separated by two or more newlines)
        const paragraphs = html.split(/\n\s*\n/);
        
        // Wrap each paragraph in <p> tags and filter out empty strings
        return paragraphs
            .map(p => p.trim())
            .filter(p => p.length > 0)
            .map(p => `<p>${p.replace(/\n/g, '<br>')}</p>`) // Replace single newlines within a block with <br>
            .join('');
    }

    /**
     * Updates a single preview element based on input.
     */
    function updatePreviewElement(inputId, previewId, attr) {
        const input = document.getElementById(inputId);
        const preview = document.getElementById(previewId);
        
        if (input && preview) {
            const value = input.value;
            
            if (attr === 'innerHTML') {
                preview.innerHTML = value;
            } else if (attr === 'src' || attr === 'href') {
                preview[attr] = value;
            }
        }
    }

    /**
     * Handles the specific logic for the body content.
     */
    function updateBodyContent() {
        const input = document.getElementById('body-input');
        const preview = document.getElementById('preview-body');
        
        if (input && preview) {
            preview.innerHTML = processBodyContent(input.value);
        }
    }

    // Initialize all previews with default values
    mappings.forEach(map => updatePreviewElement(map.inputId, map.previewId, map.attr));
    updateBodyContent();

    // Attach event listeners for real-time updates
    mappings.forEach(map => {
        const input = document.getElementById(map.inputId);
        if (input) {
            input.addEventListener('input', () => updatePreviewElement(map.inputId, map.previewId, map.attr));
        }
    });

    // Special listener for the main body content
    const bodyInput = document.getElementById('body-input');
    if (bodyInput) {
        bodyInput.addEventListener('input', updateBodyContent);
    }
});
