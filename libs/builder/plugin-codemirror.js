Isfitool.CodeEditor = {
	
	isActive: false,
	oldValue: '',
	doc:false,
	codemirror:false,
	
	init: function(doc) {

		if (this.codemirror == false)		
		{
			this.codemirror = CodeMirror.fromTextArea(document.querySelector("#isfitool-code-editor textarea"), {
				mode: 'text/html',
				lineNumbers: true,
				autofocus: true,
				lineWrapping: true,
				//viewportMargin:Infinity,
				theme: 'material'
			});
			
			this.isActive = true;
			this.codemirror.getDoc().on("change", function (e, v) { 
				if (v.origin != "setValue")
				delay(Isfitool.Builder.setHtml(e.getValue()), 1000);
			});
		}
		
		
		//_self = this;
		Isfitool.Builder.frameBody.on("isfitool.undo.add isfitool.undo.restore", function (e) { Isfitool.CodeEditor.setValue(e);});
		//load code when a new url is loaded
		Isfitool.Builder.documentFrame.on("load", function (e) { Isfitool.CodeEditor.setValue();});

		this.isActive = true;
		this.setValue();

		return this.codemirror;
	},

	setValue: function(value) {
		if (this.isActive == true)
		{
			var scrollInfo = this.codemirror.getScrollInfo();
			this.codemirror.setValue(Isfitool.Builder.getHtml());
			this.codemirror.scrollTo(scrollInfo.left, scrollInfo.top);
		}
	},

	destroy: function(element) {
		/*
		//save memory by destroying but lose scroll on editor toggle
		this.codemirror.toTextArea();
		this.codemirror = false;
		*/ 
		this.isActive = false;
	},

	toggle: function() {
		if (this.isActive != true)
		{
			this.isActive = true;
			return this.init();
		}
		this.isActive = false;
		this.destroy();
	}
}
