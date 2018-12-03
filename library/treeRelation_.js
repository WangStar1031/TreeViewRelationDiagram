function TreeRelationControl(_container){
	this.container = _container;
	this.c = document.getElementById("myCanvas");
	this.active = -1;
	this.tempRelation = null;
}
TreeRelationControl.prototype = Object.create(TreeRelationControl.prototype);
RelationTreeView.prototype.constructor = TreeRelationControl;

TreeRelationControl.prototype.setRelations = function(_arrRelations){
	this.arrRelations = _arrRelations;
}
TreeRelationControl.prototype.drawLine = function( _ctx, _cL, _cR){
	_ctx.moveTo(2, _cL);
	_ctx.arc(2, _cL, 2, 0, Math.PI * 2);
	_ctx.moveTo(1, _cL);
	_ctx.lineTo(10, _cL);
	_ctx.moveTo(10, _cL);
	_ctx.lineTo(190, _cR);
	_ctx.moveTo(190, _cR);
	_ctx.lineTo(200, _cR);
	_ctx.moveTo(200, _cR);
	_ctx.lineTo(195, _cR - 5);
	_ctx.moveTo(200, _cR);
	_ctx.lineTo(195, _cR + 5);
}
TreeRelationControl.prototype.drawRelations = function(){
	var ctx = this.c.getContext("2d");
	ctx.clearRect(0, 0, this.c.width, this.c.height);
	ctx.beginPath();
	for( var i = 0; i < this.arrRelations.length; i++){
		this.drawLine(ctx, this.arrRelations[i].lPos, this.arrRelations[i].rPos);
	}
	ctx.strokeStyle = '#000000';
	ctx.lineWidth=1;
	ctx.stroke();
	if( this.active != -1){
		ctx.beginPath();
		this.drawLine( ctx, this.arrRelations[this.active].lPos, this.arrRelations[this.active].rPos);
		// ctx.moveTo(0, this.arrRelations[this.active].lPos);
		// ctx.lineTo(200, this.arrRelations[this.active].rPos);
		ctx.strokeStyle = '#ff0000';
		ctx.lineWidth=3;
		ctx.stroke();
	}
	if( this.tempRelation != null){
		var lPos = this.tempRelation.lPos;
		var rPos = this.tempRelation.rPos;
		ctx.beginPath();
		this.drawLine( ctx, lPos, rPos);
		// ctx.moveTo(0, lPos);
		// ctx.lineTo(200, rPos);
		ctx.strokeStyle = '#00ff00';
		ctx.lineWidth=3;
		ctx.stroke();
	}
}
TreeRelationControl.prototype.setTemplate = function(_temp){
	this.tempRelation = _temp;
}
TreeRelationControl.prototype.calcDistance = function(x0, y0, x1, y1, x2, y2){
	var upper = Math.abs((y2 - y1) * x0 - (x2 - x1) * y0 + x2 * y1 - y2 * x1);
	var lower = Math.sqrt((y2 - y1) * ( y2 - y1) + ( x2 - x1) * (x2 - x1));
	return upper / lower;
}
TreeRelationControl.prototype.activeRelation = function(_x, _y){
	this.active = -1;
	for( var i = 0; i < this.arrRelations.length; i++){
		var relation = this.arrRelations[i];
		var dis = this.calcDistance(_x, _y, 0,relation.lPos, 200, relation.rPos);
		if( dis < 5){
			this.active = i;
			break;
		}
	}
	this.drawRelations();
	return this.active;
}
TreeRelationControl.prototype.removeRelation = function(){
	if( this.active == -1)
		return -1;
	var retVal = this.active;
	this.arrRelations.splice(this.active, 1);
	this.active = -1;
	this.drawRelations();
	return retVal;
}