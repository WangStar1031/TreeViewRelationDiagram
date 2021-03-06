class RelationTreeView{
	constructor(_container){
		this.allNodes = [
			{
				id: 1, name: "text_1", context: "context_1", children: [
					{id: 2, name: "text_2", context: "context_2", children: [
						{id: 4, name: "text_4", context: "context_4", children: []},
						{id: 5, name: "text_5", context: "context_5", children: []},
					]},
					{id: 3, name: "text_3", context: "context_3", children: []}
				],
			}
		];
		this.container = _container;
	}
	setNodes(_nodes){
		this.allNodes = _nodes;
	}
	resetNodes(_nodes){
		this.allNodes = _nodes;
	}
	insertNode(_node, _parentCount){
		this.strHtml += "<tr onmousedown='mouseDown(this)' onmouseup='mouseUp(this)' onmouseenter='mouseOver(this)' onmouseleave='mouseLeave(this)'>";
			this.strHtml += "<td id='" + _node.id + "'>";
				for( var i = 0; i < _parentCount; i++){
					this.strHtml += "<span class='parentSpace'>&nbsp&nbsp&nbsp</span>";
				}
				this.strHtml += "<span class='id'>" + _node.id + " : </span>";
				this.strHtml += "<span class='name'>" + _node.name + "</span>";
				this.strHtml += "<span class='context'>" + _node.context + "</span>";
			this.strHtml += "</td>";
		this.strHtml += "</tr>";
	}
	travelNodes(_arrNodes, _parentCount){
		for( var i = 0; i < _arrNodes.length; i++){
			var curNode = _arrNodes[i];
			this.insertNode(curNode, _parentCount);
			if( curNode.children){
				if( curNode.children.length)
					this.travelNodes(curNode.children, _parentCount + 1);
			}
		}
	}
	drawNodes(){
		this.strHtml = "<table class='treeViewTable'>";
		this.travelNodes(this.allNodes, 0);
		this.strHtml += "</table>";
		$("#" + this.container).html( this.strHtml);
	}
	getTopPosition(_id){
		var curTd = $("#" + this.container).find("td[id="+_id+"]").eq(0);
		var arrTds = $("#" + this.container + " td");
		for( var i = 0; i < arrTds.length; i++){
			if( arrTds.eq(i).attr("id") == _id){
				return i;
			}
		}
		return -1;
	}
	getNodes(){
		var arrTrs = $("#" + this.container).find("tr");
		// for( var i = 0; i < )
	}
}