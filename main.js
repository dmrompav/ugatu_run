window.onload = LoadGame;
		function LoadGame() {
			document.querySelector('.loader__progress_full').classList.add('loader__progress_full-ready')
			var loadTimeOut = setTimeout(function() {
				document.querySelector('.loader').remove();
				clearTimeout(loadTimeOut)
			}, 2500)
		}

		document.querySelector('.button').addEventListener('click', StartGame, false)
		function StartGame() {
			document.querySelector('.button').removeEventListener('click', StartGame, false)
			document.querySelector('.before-play').style.transform = 'scale(0)';

			

			var loadTimeOut = setTimeout(function() {
				StartEnemies();
				clearTimeout(loadTimeOut)
			}, 2000)
		}
		var wrapper = document.querySelector('.wrapper');
		var countHtml = document.querySelector('.count')
		var canvas = document.querySelector('#canvas');
		ctx = canvas.getContext('2d');
		window.addEventListener('resize', Resize, false);
		Resize();
		function Resize() {
			var
				w = window.innerWidth,
				h = window.innerHeight,
				scale;
			if ((w / h) < (1200 / 650)) {
				scale = w / 1200

			} else {
				scale = h / 650
			}
			wrapper.style.transform = 'scale(' + scale + ')'
		}

		var
			student = new Image,
			zachet = new Image,
			kursach = new Image,
			snow1 = new Image,
			snow3 = new Image,
			tree1 = new Image,
			tree2 = new Image,
			tree3 = new Image,
			samolet = new Image;
		student.src = './assets/stud.png';
		zachet.src = './assets/zachet.png';
		kursach.src = './assets/kursach.png';
		snow1.src = './assets/snow1.png';
		snow3.src = './assets/snow3.png';
		tree1.src = './assets/tree1.png';
		tree2.src = './assets/tree2.png';
		tree3.src = './assets/tree3.png';
		samolet.src = './assets/samolet.png';

		var lvl = 600,
			// sizes ---------------------------
			studentW = 249 / 1.75,
			studentH = 251 / 1.75,

			zachetW = 402 / 2,
			zachetH = 319 / 2,
			kursachW = 404 / 2.17,
			kursachH = 346 / 2.17,

			snow1W = 3310,
			snow1H = 150,
			snow3W = 601,
			snow3H = 37,

			tree1W = 154/1.3,
			tree1H = 251/1.3,
			tree2W = 73/1.3,
			tree2H = 251/1.3,
			tree3W = 191/1.3,
			tree3H = 206/1.3,

			samoletW = 3030 / 15,
			samoletH = 2238 / 15,
			// coordinates ---------------------------
			studentX = 50,
			studentY = lvl - studentH,

			zachetX = 1200,
			zachetY = lvl - zachetH,
			kursachX = 1200,
			kursachY = lvl - kursachH,
			
			snow1X = 0,
			snow1X2 = snow1X + snow1W,
			snow1Y = 700 - snow1H,
			snow3X = 0,
			snow3X2 = snow3X + snow3W,
			snow3X3 = snow3X + snow3W * 2,
			snow3Y = lvl - snow3H,

			wood1X = 20,
			wood1Y = lvl + 20 - tree1H,
			wood2X = 400,
			wood2Y = lvl + 20 - tree2H,
			wood3X = 800,
			wood3Y = lvl + 20 - tree3H,

			wood4X = 1000,
			wood4Y = lvl - 60 - tree1H,
			wood5X = 700,
			wood5Y = lvl - 60 - tree2H,
			wood6X = 100,
			wood6Y = lvl - 60 - tree3H,

			wood7X = 900,
			wood7Y = lvl - 90 - tree1H,
			wood8X = 1100,
			wood8Y = lvl - 90 - tree2H,
			wood9X = -20,
			wood9Y = lvl - 90 - tree3H,

			samoletX = 1200,
			samoletY = 30;

		var
			drawPermission	= true,
			win				= false,
			permissions		= [0, 0, 0]
			lose			= false,
			count			= 0,
			jumpCount		= 0,
			firstJumpEnd	= 0,
			timeJump		= 0,
			t				= 0,
			jumpVelocity	= 90;
		document.addEventListener('click', Jump, false)

		draw();

		function draw() {
			//Очистить канвас
			ctx.clearRect(0, 0, 1200, 800);
			//Слой 1
			ctx.drawImage(tree1, wood1X, wood1Y, tree1W, tree1H);
			ctx.drawImage(tree2, wood2X, wood2Y, tree2W, tree2H);
			ctx.drawImage(tree3, wood3X, wood3Y, tree3W, tree3H);
			//Слой 2
			ctx.drawImage(snow3, snow3X, snow3Y, snow3W, snow3H);
			ctx.drawImage(snow3, snow3X2, snow3Y, snow3W, snow3H);
			ctx.drawImage(snow3, snow3X3, snow3Y, snow3W, snow3H);
			//Слой 3
			ctx.drawImage(tree1, wood4X, wood4Y, tree1W * 1.6, tree1H * 1.6);
			ctx.drawImage(tree2, wood5X, wood5Y, tree2W * 1.6, tree2H * 1.6);
			// ctx.drawImage(tree3, wood6X, wood6Y, tree3W * 1.1, tree3H * 1.1);
			//Слой 4
			ctx.fillStyle = '#dddddd';
			ctx.fillRect(-1, 600, 1202, 101);
			ctx.strokeRect(-1, 600, 1202, 101);
			ctx.drawImage(student, studentX, studentY, studentW, studentH);
			ctx.drawImage(zachet, zachetX, zachetY, zachetW, zachetH);
			ctx.drawImage(kursach, kursachX, kursachY, kursachW, kursachH);
			ctx.drawImage(samolet, samoletX, samoletY, samoletW, samoletH);
			//Слой 5
			ctx.drawImage(tree1, wood7X, wood7Y, tree1W * 2, tree1H * 2);
			// ctx.drawImage(tree2, wood8X, wood8Y, tree2W * 1.2, tree2H * 1.2);
			ctx.drawImage(tree3, wood9X, wood9Y, tree3W * 2, tree3H * 2);
			//Слой 6
			ctx.drawImage(snow1, snow1X, snow1Y, snow1W, snow1H);
			ctx.drawImage(snow1, snow1X2, snow1Y, snow1W, snow1H);

			if(!win) {
				moveAllMoveable();
			}
			enemyMove();
			isWin();
			isLosing();

			if (drawPermission) {
				requestAnimationFrame(draw);
			}
		}
		function moveAllMoveable() {
			wood1X	= (wood1X <= -300? 1200: wood1X - 3);
			wood2X	= (wood2X <= -300? 1200: wood2X - 3);
			wood3X	= (wood3X <= -300? 1200: wood3X - 3);
			wood4X	= (wood4X <= -300? 1200: wood4X - 8);
			wood5X	= (wood5X <= -300? 1200: wood5X - 8);
			wood6X	= (wood6X <= -300? 1200: wood6X - 8);
			wood7X	= (wood7X <= -300? 1200: wood7X - 18);
			wood8X	= (wood8X <= -300? 1200: wood8X - 18);
			wood9X	= (wood9X <= -300? 1200: wood9X - 18);

			snow3X	= (snow3X <= -snow3W?	snow3X3 + snow3W - 2: snow3X - 2);
			snow3X2	= (snow3X2 <= -snow3W?	snow3X + snow3W: snow3X2 - 2);
			snow3X3	= (snow3X3 <= -snow3W?	snow3X2 + snow3W: snow3X3 - 2);

			snow1X	= (snow1X <= -snow1W? snow1X2 + snow1W - 11: snow1X - 11);
			snow1X2	= (snow1X2 <= -snow1W? snow1X + snow1W: snow1X2 - 11);
		}
		function enemyMove() {
			zachetX		-= 13 * permissions[0];
			kursachX	-= 13 * permissions[1];
			samoletX	-= 13 * permissions[2];
			if (lose) {
				studentX -= 13
			} else {
				timeJump = timeJump + t;
				if(jumpCount === 1) {
					studentY	= ((456 - (jumpVelocity * timeJump) + (20 * timeJump * timeJump / 2)));
				} else if(jumpCount === 2) {
					studentY	= ((firstJumpEnd - (jumpVelocity * timeJump) + (20 * timeJump * timeJump / 2)))
				}
				if(studentY > 457) {
					timeJump = 0;
					t = 0;
					studentY = 456;
					jumpCount = 0;
				}
			}
			if (win) {
				studentX += 13
			}
			
			if (zachetX < -200) {
				zachetX = 1200;
				permissions[0] = 0
			}
			if (kursachX < -200) {
				kursachX = 1200;
				permissions[1] = 0
			}
			if (samoletX < -200) {
				samoletX = 1200;
				permissions[2] = 0
			}
			
		}
		function Jump() {
			if (jumpCount < 2) {
				t = 0.16;
				jumpCount++;
				if(jumpCount === 2) {
					timeJump = 0;
					firstJumpEnd = studentY;
				}
			}
		}
		function StartEnemies() {
			var enemyInterval = setInterval(function() {
				permissions[Math.floor(Math.random() * permissions.length)] = 1
				if (lose || win) {
					clearInterval(enemyInterval)
				}
			}, 500)
		}



		function isWin() {
			if((zachetX > 0 && zachetX <= 13) || (kursachX > 0 && kursachX <= 13)){
				if (!win && !lose) {
					console.log(win, lose)
					count++;
					countHtml.innerHTML = count
				}
			}
			if(count === 30) {
				win = true;
				permissions[0] = 0;
				permissions[1] = 0;
				permissions[2] = 0;
				GameWin();
			}
		}
		function isLosing() {
			if ((studentY > (lvl - kursachH - studentH + 40)) && ((zachetX > (studentX-zachetW + 40) && zachetX < (studentX+studentW - 20)) || (kursachX > (studentX-kursachW + 40) && kursachX < (studentX+studentW - 20)))) {
				if (!win) {
					lose = true;
					GameOver();
				}
			}
			if ((studentY < samoletY + samoletH - 50) && ((samoletX > (studentX-samoletW + 30) && samoletX < (studentX+studentW - 90)))) {
				if (!win) {
					lose = true;
					GameOver();
				}
			}
		}



		function GameOver() {
			var A = setTimeout(function() {
				drawPermission = false;
				document.querySelector('.before-play').style.transform = 'scale(1)';
				document.querySelector('.button').addEventListener('click', RestartGame, false)
				document.querySelector('.txt').innerHTML = '';
				clearTimeout(A);
			}, 1500)
		}
		function GameWin() {
			var A = setTimeout(function() {
				drawPermission = false;
				document.querySelector('.before-play').style.transform = 'scale(1)';
				document.querySelector('.button').addEventListener('click', RestartGame, false);
				document.querySelector('.txt').innerHTML = `<video autoplay class="video" width="640" height="352"><source src="./assets/V.mp4" type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'></video>`;
				// document.querySelector('.video').play();
				clearTimeout(A);
			}, 1500)
		}

		function RestartGame() {
			window.location.reload();
		}
