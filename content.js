// Function to inject the Save button near the Run button
function injectSaveButton() {
  const runButton = document.querySelector('.desktop-run-button.run');

  if (runButton) {
    console.log('Run button found:', runButton);

    // Check if the button already exists to avoid adding multiple
    if (!document.querySelector('#save-code-button')) {
      const saveButton = document.createElement('button');
      saveButton.textContent = 'Save Code';
      saveButton.id = 'save-code-button'; // Give it an ID so we don’t add it multiple times
      saveButton.style.marginRight = '10px';  // Adjusted margin to the right
      saveButton.style.backgroundColor = '#4CAF50';
      saveButton.style.color = 'white';
      saveButton.style.padding = '8px 16px';
      saveButton.style.border = 'none';
      saveButton.style.cursor = 'pointer';

      // Insert the "Save Code" button next to the "Run" button
      runButton.parentNode.insertBefore(saveButton, runButton.nextSibling);

      // Add event listener to save code when the button is clicked
      saveButton.addEventListener('click', saveCode);
      console.log('Save Code button added.');
    }
  } else {
    console.log('Run button not found. Retrying...');
    setTimeout(injectSaveButton, 1000);  // Retry after 1 second if the "Run" button is not found
  }
}

async function saveCode() {
  const codeEditor = document.querySelector('#editor');
  
  if (codeEditor) {
    // Extract the text content from the editor
    const codeLines = codeEditor.querySelectorAll('.ace_line');
    const code = Array.from(codeLines).map(line => line.textContent).join('\n');

    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    const fileHandle = await window.showSaveFilePicker({
      suggestedName: 'code.js',
      types: [{
        description: 'JavaScript Files',
        accept: {'text/javascript': ['.js']}
      }]
    });

    const writableStream = await fileHandle.createWritable();
    await writableStream.write(code);
    await writableStream.close();

    console.log('Code saved successfully.');
    alert('Code saved successfully!');
  } else {
    console.error('Code editor not found!');
    alert('Code editor not found!');
  }
}

// Observe DOM changes to handle dynamic content loading
const observer = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    if (mutation.addedNodes.length > 0) {
      injectSaveButton();
    }
  });
});

// Start observing the document for changes
observer.observe(document.body, { childList: true, subtree: true });

// Initial function run after the window loads
window.onload = injectSaveButton;









