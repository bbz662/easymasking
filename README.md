# EasyMasking

A Chrome extension that allows you to mask and unmask selected text on any webpage.

## Features

- **Mask Selected Text**: Hide selected text with a black overlay.
- **Unmask Selected Text**: Reveal previously masked text.
- **Floating Action Buttons**: "Mask" and "Unmask" buttons appear next to your selection.
- **User-Friendly Interface**: Simple and intuitive to use.

## Installation

1. **Download the Extension Files**:
   - Ensure you have the following files in a folder:
     - `manifest.json`
     - `content.js`
     - `content.css`

2. **Open Chrome Extensions Page**:
   - Open Google Chrome.
   - Navigate to `chrome://extensions/`.

3. **Enable Developer Mode**:
   - Toggle the "Developer mode" switch on the top right corner.

4. **Load Unpacked Extension**:
   - Click on the "Load unpacked" button.
   - Select the folder containing the extension files.

5. **Confirm Installation**:
   - The extension should now appear in your list of extensions.

## Usage

1. **Navigate to a Webpage**:
   - Go to any webpage where you want to use the extension.

2. **Select Text**:
   - Highlight the text you wish to mask or unmask.

3. **Wait Briefly**:
   - After selecting, wait about 100 milliseconds for the action buttons to appear.

4. **Use Action Buttons**:
   - **Mask**: Click the "Mask" button to hide the selected text.
   - **Unmask**: Click the "Unmask" button to reveal the text.

## Notes

- **Button Position**: The action buttons appear to the right of your selected text.
- **Temporary Masking**: Masking is not saved after page reloads.
- **Performance**: A slight delay is added for better performance and user experience.

## Known Issues

- **Complex Websites**: May not work properly on sites with complex structures or heavy scripts.
- **Style Conflicts**: Some site styles might interfere with the masking effect.

## Contributing

- **Feedback and Issues**: Feel free to report issues or suggest improvements.
- **Pull Requests**: Contributions are welcome via pull requests.

## License

This project is licensed under the MIT License.

---

**Disclaimer**: This extension is for personal use. Please be mindful of website terms of service when using browser extensions.
