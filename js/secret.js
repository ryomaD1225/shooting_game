        // canvas base
        const can = $("#canvas")[0];
        const ctx = can.getContext("2d");

        /*---------------------------
         * player機について
         *--------------------------*/
        //Player元オブジェクト
        let player = {
            posX:0,
            posY:can.height/2,
            w:null,
            h:null,
            image:"",
            draw:function(){
                const img = new Image();
                img.src="images/ufo.gif";
                img.onload=function(){
                    ctx.drawImage(img,player.posX,player.posY);
                    player.w = img.width;
                    player.h = img.height;
                    player.image=img;
                }
            }
        };

        // マウス操作でPlayer動かす関数

        //マウスで動かした際のイベント設定
        // can.addEventListener("mousemove",function(){


        // });

        $(can).on("mousemove",function(e){
            ctx.clearRect(player.posX,player.posY,player.w,player.h);
            player.posX = e.offsetX;
            player.posY = e.offsetY;
            ctx.drawImage(player.image,player.posX,player.posY);
        });


        // can.addEventListener("mousemove",mMove,true);

        /*---------------------------
         * ボールについて
         *--------------------------*/
        //ボール元オブジェクト
        let ball = {
            speed:10,
            w:8,
            h:8,
            color:"#f00"
        };

        
        // ctx.fillStyle = "#f00";
        // ctx.fillRect(0,0,40,40);

        //ボールの各弾データ管理用の格納配列
        let ballAry = [];

        // ボール作成の関数
        let ballInit = function(){
            let newBall = Object.assign({posX:player.posX,posY:player.posY},ball);
            ctx.fillStyle = newBall.color;
            ballAry.push(newBall);
        }
        // 配列内の全てのボールが移動するための関数
        let ballMove = function(){
            for(let i=0;i<ballAry.length;i++){
                ctx.clearRect(ballAry[i].posX,ballAry[i].posY,ballAry[i].w,ballAry[i].h);
                ballAry[i].posX += ballAry[i].speed;
                ctx.fillRect(ballAry[i].posX,ballAry[i].posY,ballAry[i].w,ballAry[i].h);
            }
        };


        // 配列内の全てのボールを精査して、スクリーンアウトしたら消去する関数
        let ballDelete = function(){
            let new_ballAry = [];
            for(let i=0;i<ballAry.length;i++){
                if(ballAry[i].posX>=can.width){
                    delete ballAry[i];
                }else{
                    new_ballAry.push(ballAry[i]);
                }
            }
            ballAry = new_ballAry;
        };
        
        // mousedownするたびにballデータを作成するようイベント追加
        $(window).on("mousedown",ballInit);

        /*---------------------------
         * 敵について
         *--------------------------*/
        // 敵の元オブジェクト
        let enemy = {
            speed:5,
            w:null,
            h:null,
            posX:can.width,
            image:"",
            draw:function(){
                const img = new Image();
                img.src = "images/stamp5.png";
                img.onload = function(){
                    enemy.image =img;
                    enemy.w = img.width;
                    enemy.h = img.height;
                }
            }
        }

        // 敵格納用配列
        let enemyAry = [];

        // 敵の出現+配列への格納のための関数
        let appearEnemy = function(){
            const percent = Math.floor(Math.random()*100);//敵が出てくる確率
            const randomYPosition = Math.floor(Math.random()*can.height);//敵が出現する場所をランダムで変更する

            let newEnemy = Object.assign({posY:randomYPosition},enemy);
            if(percent>90){
                ctx.drawImage(newEnemy.image,newEnemy.posX,newEnemy.posY);
                enemyAry.push(newEnemy);
            }
        }


        // 敵を動かすための関数
        let moveEnemy = function(){
            for(let i =0;i<enemyAry.length;i++){
                ctx.clearRect(enemyAry[i].posX,enemyAry[i].posY,enemyAry[i].w,enemyAry[i].h);
                enemyAry[i].posX -=enemyAry[i].speed;
                ctx.drawImage(enemyAry[i].image,enemyAry[i].posX,enemyAry[i].posY);
            }
        }

        // 敵がスクリーンアウトした際に配列から消去するための関数
        let deleteEnemy = function(){
            let newEnemys = [];
            for(let i=0;i<enemyAry.length;i++){
                if(enemyAry[i].posX>=0-enemy.w){
                    newEnemys.push(enemyAry[i]);
                }else{
                    ctx.clearRect(enemyAry[i].posX,enemyAry[i].posY,enemyAry[i].w,enemyAry[i].h);
                }
            }
            enemyAry = newEnemys;
        }

        /*---------------------------
         * 当たり判定
         *--------------------------*/
        let hitBox = function(){
            for(let i=0;i<ballAry.length;i++){
                const b = ballAry[i];//１発１発の弾=b
                for(let j=0;j<enemyAry.length;j++){
                    const a = enemyAry[j];//1体1体の敵=a
                    if((b.posX+b.w)>=a.posX&&b.posY<=(a.posY+a.h)&&(b.posY+b.h)>=a.posY){
                        enemyAry.splice(j,1);
                        ctx.clearRect(a.posX,a.posY,a.w,a.h);
                        ballAry.splice(i,1);
                        ctx.clearRect(b.posX,b.posY,b.w,b.h);
                    }
                }
            }
        }
        /*---------------------------
         * 読み込み時に実行する関数
         *--------------------------*/
         $(window).on("load",function(){
            player.draw();
            enemy.draw();
        });


        /*---------------------------
         * ループで実行する関数
         *--------------------------*/
         setInterval(function(){
            ballMove();
            ballDelete();
            appearEnemy();
            moveEnemy();
            deleteEnemy();
            hitBox();
        },100);