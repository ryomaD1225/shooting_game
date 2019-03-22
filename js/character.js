function Character(){
    this.position = new Point();
    this.size = 0;
}

Character.prototype.init = function(size){
    this.size = size;
};

//----- 自機ショット用のクラス ------------
function CharacterShot(){
    this.position = new Point();    //Pointクラスのインスタンス
    this.size = 0;                  //自機ショットサイズ
    this.speed = 0;                 //自機ショットの進むスピード
    this.alive = false;             //自機ショットの生存フラグ   ショットは自機キャラクターと違い画面上に描かれる場合とそうでない場合がある。
}                                   // alive はこの書かれるべきなのかどうかという状態を管理するために使われる。



// set メソッドは引数を三つ受け取り、それを元に自機ショットを初期化する。(初期位置と、サイズ、スピードを引数として与える)
//メソッドが呼び出されると自動的にフラグが立つようになっている。
CharacterShot.prototype.set = function(p, size, speed){
    // 座標をセット
    this.position.x = p.x;
    this.position.y = p.y;

    // サイズ、スピードセット
    this.size = size;
    this.speed = speed;

    //生存フラッグを立てる
    this.alive = true;
};



//ショットの動きに関する処理を持っている。
CharacterShot.prototype.move = function(){

    //座標を真上にスピード分だけ移動させる
    //自機ショットは上方向に進むから Y の値はどんどん小さくなる。
    this.position.y -= this.speed;

    //ショットは四、五画面外に消えていくから、ショットの生存フラグを降ろしておかないと、ショットを再度、撃つことができない。
    //だからショットの位置とサイズを考慮してショットが画面外に出たらショットのフラグは降ろすような処理にする。
    //一定以上の座標に到達していたら生存フラグを降ろす
    if(this.position.y < -this.size){
        this.alive = false;
    }
};

//--- enemy --------------------
function Enemy(){
    this.position = new Point();
    this.size = 0;
    this.type = 0;
    this.param = 0;
    this.alive = false;
}

Enemy.prototype.set = function(p, size, type){
    //座標をセット
    this.position.x = p.x;
    this.position.y = p.y;

    //サイズ、タイプをセット
    this.size = size;
    this.type = type;

    //パラメーターをリセット
    this.param = 0;

    //生存フラグを立てる
    this.alive = true;
};

Enemy.prototype.move = function(){
    //パラメーターをインクリメント
    this.param++;

    //タイプに応じて分技
    switch (this.type){
        case 0:
            // X 方向にまっすぐ進む
            this.position.x += 2;

            // スクリーンの右端より奥に到達したら生存フラグを降ろす。
            if(this.position.x > this.size + screenCanvas.width){
                this.alive = false;
            }
            break;
        case 1:


        // マイナス X 方向へまっすぐ進む
        this.position.x -= 2;

        // スクリーンの左端より奥に到達したら生存フラグを降ろす
        if(this.position.x < -this.size){
            this.alive = false;
        }
        break;
    }
};



//--    敵のショットを管理するクラス   ----
function EnemyShot(){
    this.position = new Point();
    this.vector = new Point();
    this.size = 0;
    this.speed = 0;
    this.alive = false;
}


EnemyShot.prototype.set = function(p, vector, size, speed){
    //座標、ベクトルをセット
    this.position.x = p.x;
    this.position.y = p.y;
    this.vector.x = vector.x;
    this.vector.y = vector.y;

    //サイズ、スピードをセット
    this.size = size;
    this.speed = speed;

    //生存フラッグを立てる
    this.alive = true;

};

EnemyShot.prototype.move = function(){
    //座標をベクトルに応じてspeed分だけ移動させる
    this.position.x += this.vector.x * this.speed;
    this.position.y += this.vector.y * this.speed;

    //一定以上の座標に到達したら生存フラグを降ろす
    if(
        this.position.x < -this.size ||
        this.position.y < -this.size ||
        this.position.x > this.size + screenCanvas.width ||
        this.position.y > this.size + screenCanvas.height
    ){
        this.alive = false;
    }
};