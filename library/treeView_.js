function RelationTreeView(_container){
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
RelationTreeView.prototype = Object.create(RelationTreeView.prototype);
RelationTreeView.prototype.constructor = RelationTreeView;
RelationTreeView.prototype.setNodes = function(_nodes){
	this.allNodes = _nodes;
}
RelationTreeView.prototype.resetNodes = function(_nodes){
	this.allNodes = _nodes;
}
RelationTreeView.prototype.insertNode = function(_node, _parentCount){
	this.strHtml += "<tr onmousedown='mouseDown(this)' onmouseup='mouseUp(this)' onmouseenter='mouseOver(this)' onmouseleave='mouseLeave(this)'>";
	var isParent = false;
	if( _node.children){
		if( _node.children.length){
			isParent = true;
		}
	}
		this.strHtml += "<td id='" + _node.id + "'";
		if( isParent){
			this.strHtml += " class='parentNode'";
		} else{
			this.strHtml += " class='childNode'";
		}
		this.strHtml += ">";
			for( var i = 0; i < _parentCount; i++){
				this.strHtml += "<span class='parentSpace'>&nbsp&nbsp&nbsp&nbsp</span>";
			}
			this.strHtml += "<span class='id'>" + _node.id + " : </span>";
			this.strHtml += "<span class='name'>" + _node.name + "</span>";
			this.strHtml += "<span class='context'>" + _node.context + "</span>";
		this.strHtml += "</td>";
	this.strHtml += "</tr>";
}
RelationTreeView.prototype.travelNodes = function(_arrNodes, _parentCount){
	for( var i = 0; i < _arrNodes.length; i++){
		var curNode = _arrNodes[i];
		this.insertNode(curNode, _parentCount);
		if( curNode.children){
			if( curNode.children.length)
				this.travelNodes(curNode.children, _parentCount + 1);
		}
	}
}
RelationTreeView.prototype.drawNodes = function(){
	this.strHtml = "<table class='treeViewTable'>";
	this.travelNodes(this.allNodes, 0);
	this.strHtml += "</table>";
	$("#" + this.container).html( this.strHtml);
}
RelationTreeView.prototype.getTopPosition = function(_id){
	var curTd = $("#" + this.container).find("td[id="+_id+"]").eq(0);
	var arrTds = $("#" + this.container + " td");
	for( var i = 0; i < arrTds.length; i++){
		if( arrTds.eq(i).attr("id") == _id){
			return i;
		}
	}
	return -1;
}
RelationTreeView.prototype.getNodes = function(){
	var arrTrs = $("#" + this.container).find("tr");
	// for( var i = 0; i < )
}