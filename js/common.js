
//X と Y のふたつの座標情報を格納するためだけのクラス
//座標を扱うクラス
// canvas 要素は左上を x座標、y座標 = 0:0 と考える。

function Point(){
    this.x = 0;
    this.y = 0;
    
}


//
Point.prototype.distance = function(p){
    var q = new Point();
    q.x = p.x - this.x;
    q.y = p.y - this.y;
    return q;
};




Point.prototype.length = function(){
    return Math.sqrt(this.x * this.x + this.y * this.y);
};




Point.prototype.normalize = function(){
    var i = this.length();
    if(i > 0){
        var j = 1 / i;
        this.x *= j;
        this.y *= j;
    }
};

