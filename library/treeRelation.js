class TreeRelationControl{
	constructor(_container){
		this.container = _container;
		this.c = document.getElementById("myCanvas");
		this.active = -1;
	}
	setRelations(_arrRelations){
		this.arrRelations = _arrRelations;
	}
	drawRelations(){
		var ctx = this.c.getContext("2d");
		ctx.clearRect(0, 0, this.c.width, this.c.height);
		ctx.beginPath();
		for( var i = 0; i < this.arrRelations.length; i++){
			ctx.moveTo(0, this.arrRelations[i].lPos);
			ctx.lineTo(200, this.arrRelations[i].rPos);
		}
		ctx.strokeStyle = '#000000';
		ctx.lineWidth=1;
		ctx.stroke();
		if( this.active != -1){
			ctx.beginPath();
			ctx.moveTo(0, this.arrRelations[this.active].lPos);
			ctx.lineTo(200, this.arrRelations[this.active].rPos);
			ctx.strokeStyle = '#ff0000';
			ctx.lineWidth=3;
			ctx.stroke();
		}
	}
	calcDistance(x0, y0, x1, y1, x2, y2){
		var upper = Math.abs((y2 - y1) * x0 - (x2 - x1) * y0 + x2 * y1 - y2 * x1);
		var lower = Math.sqrt((y2 - y1) * ( y2 - y1) + ( x2 - x1) * (x2 - x1));
		return upper / lower;
	}
	activeRelation(_x, _y){
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
	}
	removeRelation(){
		if( this.active == -1)
			return;
		this.arrRelations.splice(this.active, 1);
		this.active = -1;
		this.drawRelations();
	}
}