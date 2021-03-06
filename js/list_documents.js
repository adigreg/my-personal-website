var folder_id = document.getElementById("doc_list").getAttribute("folder");

var apiUrl = 'https://www.googleapis.com/drive/v3/files?q=%22' + folder_id + '%22%20in%20parents&key=' + config["apiKey"];
var file_ids = [];
fetch(apiUrl).then(response => {
  return response.json();
}).then(data => {
  // Work with JSON data here
  data.files.forEach((file) => 
  {file_ids.push(file["id"])
  });
  calldocsAPI(file_ids)
}).catch(err => {
  // Do something for an error here
});

function calldocsAPI(file_ids) {
    file_ids = file_ids.sort();
    file_ids.forEach((id) => {
        var url = 'https://script.google.com/macros/s/AKfycbwmMtHxEBr0KJsNohjJZAFi1ZjZ8ZPMMcesau-tsUFoQokl5zxJ/exec?documentId=' + id + '&key=' + config["apiKey"];
        fetch(url)
        .then((response)=> response.json())
        .then(data => {
            var structured = data.body.content;
            var title = data.title;
            var node = document.getElementById('content');
            var articlenode = document.createElement('article');
            var headernode = document.createElement('h1');
            headernode.appendChild(document.createTextNode(title));
            articlenode.appendChild(headernode);
            var runningtext = read_strucutural_elements(structured,articlenode);
           // add_poem(title,runningtext)
            node.appendChild(articlenode);
        })
    });
    return
  }

function read_paragraph_element(element){
    text_run = element.textRun;
    if (!text_run){
        return '';
    }
    return text_run.content;
}

function read_strucutural_elements(elements,articlenode){
    var text = '';
    elements.forEach(value => {
        if ('paragraph' in value){
            paragraphs = value["paragraph"]["elements"];
            paragraphs.forEach(para => {
                //text += read_paragraph_element(para);
                var pelement = document.createElement('p');
                pelement.appendChild(document.createTextNode(read_paragraph_element(para)));
                articlenode.appendChild(pelement);
            })
        }
    })
    return text;
}

