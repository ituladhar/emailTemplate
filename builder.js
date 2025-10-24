// --- DOM Elements ---
const titleInput = document.getElementById('title-input');
const headerLogoInput = document.getElementById('header-logo-input'); 
const headlineInput = document.getElementById('headline-input');
const bodyInput = document.getElementById('body-input');
const ctaTextInput = document.getElementById('cta-text-input');
const ctaLinkInput = document.getElementById('cta-link-input');
const ctaDescriptionInput = document.getElementById('cta-description-input');
const footerLogoInput = document.getElementById('footer-logo-input');
const footerNameInput = document.getElementById('footer-name-input');
const footerTitleInput = document.getElementById('footer-title-input');
const footerMarketInput = document.getElementById('footer-market-input');

const previewTitle = document.getElementById('preview-title');
const previewHeaderLogo = document.getElementById('preview-header-logo'); 
const previewHeadline = document.getElementById('preview-headline');
const previewBody = document.getElementById('preview-body');
const previewCta = document.getElementById('preview-cta');
const previewCtaDescription = document.getElementById('preview-cta-description');
const previewFooterLogo = document.getElementById('preview-footer-logo');
const previewFooterName = document.getElementById('preview-footer-name');
const previewFooterTitle = document.getElementById('preview-footer-title');
const previewFooterMarket = document.getElementById('preview-footer-market');

/**
 * Simple markdown-to-HTML converter
 * Handles bold (**), italics (* or _), horizontal rule (---), and ACTION REQUIRED highlighting.
 */
function formatContent(text) {
    let html = text;

    // 1. HORIZONTAL RULE: Replace "---" on its own line with an HTML hr
    const hr_style = 'border: 0; border-top: 1px solid #e0e0e0; margin: 20px 0;';
    // Use regex to match "---" only when it's on a line by itself (or with whitespace)
    html = html.replace(/^\s*---/gm, `<hr style="${hr_style}">`);

    // 2. Formatting (ITALICS and BOLD)
    // ITALICS: Replace *text* or _text_ with <em>text</em>.
    html = html.replace(/(\*|_)(.*?)\1/g, '<em>$2</em>');
    
    // BOLD: Replace **text** with <strong>text</strong>
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // 3. ACTION REQUIRED: Highlight specific phrases in magenta
    // Note: If 'ACTION REQUIRED' is also enclosed in ** it will be bold and magenta.
    html = html.replace(/ACTION REQUIRED/g, '<span class="text-magenta">ACTION REQUIRED</span>');

    // 4. PARAGRAPHS: Split by one or more newlines and wrap each line in a <p> tag
    const paragraphs = html.split(/\n+/).map(p => p.trim()).filter(p => p.length > 0);
    
    // Check for lines that are just the <hr> tag to avoid wrapping them in <p>
    return paragraphs.map(p => {
        if (p.startsWith('<hr')) {
            return p;
        }
        return `<p style="margin: 0 0 15px;">${p}</p>`;
    }).join('');
}

/**
 * Updates the preview pane with the content from the input fields.
 */
function updatePreview() {
    // Update Cell Nation Logo (Header)
    previewHeaderLogo.src = headerLogoInput.value;

    // Update Title
    previewTitle.textContent = titleInput.value;

    // Update Headline (with formatting)
    previewHeadline.innerHTML = formatContent(headlineInput.value);
    
    // Update Body (with formatting)
    previewBody.innerHTML = formatContent(bodyInput.value);

    // Update CTA Button
    previewCta.textContent = ctaTextInput.value;
    previewCta.href = ctaLinkInput.value;
    
    // Update CTA Description
    previewCtaDescription.textContent = ctaDescriptionInput.value;

    // Update Footer
    previewFooterLogo.src = footerLogoInput.value;
    previewFooterName.textContent = footerNameInput.value;
    previewFooterTitle.textContent = footerTitleInput.value;
    previewFooterMarket.textContent = footerMarketInput.value;
}

// --- Event Listeners ---
const inputs = [
    titleInput, headerLogoInput, headlineInput, bodyInput, 
    ctaTextInput, ctaLinkInput, ctaDescriptionInput, 
    footerLogoInput, footerNameInput, footerTitleInput, footerMarketInput
];

inputs.forEach(input => {
    // Listen for input changes in all fields
    input.addEventListener('input', updatePreview);
});

// --- Initial Load ---
// Run updatePreview when the document is fully loaded to populate the preview with default values
document.addEventListener('DOMContentLoaded', updatePreview);
