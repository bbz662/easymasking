let floatingMenu = null;
let showMenuTimeout = null;

function createFloatingMenu() {
    floatingMenu = document.createElement('div');
    floatingMenu.style.position = 'absolute';
    floatingMenu.style.zIndex = 10000;
    floatingMenu.style.background = '#fff';
    floatingMenu.style.border = '1px solid #ccc';
    floatingMenu.style.padding = '5px';
    floatingMenu.style.borderRadius = '5px';
    floatingMenu.style.boxShadow = '0 2px 6px rgba(0,0,0,0.2)';
    floatingMenu.style.display = 'none';

    const maskButton = document.createElement('button');
    maskButton.innerText = 'Mask';
    maskButton.style.marginRight = '5px';
    maskButton.addEventListener('click', maskSelection);

    const unmaskButton = document.createElement('button');
    unmaskButton.innerText = 'Unmask';
    unmaskButton.addEventListener('click', unmaskSelection);

    floatingMenu.appendChild(maskButton);
    floatingMenu.appendChild(unmaskButton);

    document.body.appendChild(floatingMenu);
}

function updateFloatingMenuPosition() {
    const selection = window.getSelection();
    if (selection.rangeCount > 0 && !selection.isCollapsed) {
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();

        if (showMenuTimeout) {
            clearTimeout(showMenuTimeout);
        }

        showMenuTimeout = setTimeout(() => {
            floatingMenu.style.top = `${rect.top + window.scrollY}px`;
            floatingMenu.style.left = `${rect.right + window.scrollX + 5}px`;
            floatingMenu.style.display = 'block';
            showMenuTimeout = null;
        }, 100);
    } else {
        if (showMenuTimeout) {
            clearTimeout(showMenuTimeout);
            showMenuTimeout = null;
        }
        floatingMenu.style.display = 'none';
    }
}


function handleSelectionChange() {
    updateFloatingMenuPosition();
}

function maskSelection() {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);

        const startRange = range.cloneRange();
        const endRange = range.cloneRange();

        if (startRange.startContainer.nodeType === Node.TEXT_NODE) {
            const textNode = startRange.startContainer;

            if (startRange.startOffset > 0) {
                const newTextNode = textNode.splitText(startRange.startOffset);
                if (startRange.endContainer === textNode) {
                    startRange.setEnd(newTextNode, startRange.endOffset - startRange.startOffset);
                }
                startRange.setStart(newTextNode, 0);
            }
        }

        if (endRange.endContainer.nodeType === Node.TEXT_NODE) {
            const textNode = endRange.endContainer;

            if (endRange.endOffset < textNode.length) {
                textNode.splitText(endRange.endOffset);
            }
        }

        const contents = startRange.cloneContents();
        const span = document.createElement('span');
        span.className = 'masked-text';
        span.appendChild(contents);

        startRange.deleteContents();
        startRange.insertNode(span);

        selection.removeAllRanges();

        if (floatingMenu) {
            floatingMenu.style.display = 'none';
        }
    }
}


function unmaskSelection() {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);

        const maskedSpans = [];
        const treeWalker = document.createTreeWalker(
            range.commonAncestorContainer,
            NodeFilter.SHOW_ELEMENT,
            {
                acceptNode: function (node) {
                    if (node.nodeName === 'SPAN' && node.classList.contains('masked-text')) {
                        return range.intersectsNode(node) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
                    }
                    return NodeFilter.FILTER_SKIP;
                }
            }
        );

        let currentNode = treeWalker.nextNode();
        while (currentNode) {
            maskedSpans.push(currentNode);
            currentNode = treeWalker.nextNode();
        }

        maskedSpans.forEach(span => {
            const parent = span.parentNode;
            while (span.firstChild) {
                parent.insertBefore(span.firstChild, span);
            }
            parent.removeChild(span);
        });

        selection.removeAllRanges();

        if (floatingMenu) {
            floatingMenu.style.display = 'none';
        }
    }
}


function getTextNodesInRange(range) {
    const textNodes = [];
    const treeWalker = document.createTreeWalker(
        range.commonAncestorContainer,
        NodeFilter.SHOW_TEXT,
        {
            acceptNode: function (node) {
                const nodeRange = document.createRange();
                nodeRange.selectNodeContents(node);
                return range.intersectsNode(node) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
            }
        }
    );

    let currentNode = treeWalker.currentNode;
    while (currentNode) {
        if (range.intersectsNode(currentNode)) {
            textNodes.push(currentNode);
        }
        currentNode = treeWalker.nextNode();
    }

    return textNodes;
}

function getMaskedElementsInRange(range) {
    const elements = [];
    const treeWalker = document.createTreeWalker(
        range.commonAncestorContainer,
        NodeFilter.SHOW_ELEMENT,
        {
            acceptNode: function (node) {
                return node.classList.contains('masked-text') && range.intersectsNode(node)
                    ? NodeFilter.FILTER_ACCEPT
                    : NodeFilter.FILTER_REJECT;
            }
        }
    );

    let currentNode = treeWalker.currentNode;
    while (currentNode) {
        if (range.intersectsNode(currentNode)) {
            elements.push(currentNode);
        }
        currentNode = treeWalker.nextNode();
    }

    return elements;
}

document.addEventListener('selectionchange', handleSelectionChange);

if (!floatingMenu) {
    createFloatingMenu();
}
