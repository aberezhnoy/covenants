import $ from "jquery";

function downloadFile(fileName, content) {
    const d = $.Deferred();
    const textToSaveAsBlob = new Blob([content], {type:"text/json"});
    const textToSaveAsURL = window.URL.createObjectURL(textToSaveAsBlob);

    const downloadLink = document.createElement("a");
    downloadLink.download = fileName;
    downloadLink.innerHTML = "Download File";
    downloadLink.href = textToSaveAsURL;
    downloadLink.onclick = function(event) {
        document.body.removeChild(event.target);
    };
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);
    downloadLink.click();

    return d.promise();
}

function uploadFile() {
    const d = $.Deferred();
    const fileToLoad = document.getElementById("fileToLoad").files[0];
    const fileReader = new FileReader();

    fileReader.onload = function(fileLoadedEvent) {
        const textFromFileLoaded = fileLoadedEvent.target.result;
        d.resolve(textFromFileLoaded);
    };

    fileReader.readAsText(fileToLoad, "UTF-8");

    return d.promise();
}

export {
    downloadFile,
    uploadFile };
