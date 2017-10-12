'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Bull = function () {
	function Bull(options) {
		_classCallCheck(this, Bull);

		this.options = options;
		this.box = document.querySelector(options.box || '.box');
		this.sendBtn = document.querySelector(options.btn || '#btn');
		this.userData = document.querySelector(options.input || '#input');
		this.bullPipe = Array.from(document.querySelectorAll('.bull-pipe'));
	}
	// ��ʼ���¼�


	_createClass(Bull, [{
		key: 'init',
		value: function init() {
			this.bindEvent();
		}
		// ������ɫ

	}, {
		key: 'getRandomParam',
		value: function getRandomParam() {
			var random = Math.random,
			    floor = Math.floor;

			var r = floor(random() * 256);
			var g = floor(random() * 256);
			var b = floor(random() * 256);
			return {
				color: 'rgb(' + r + ', ' + g + ', ' + b + ')'
			};
		}
		// �ж� ������ǰ��������һ��Ԫ�ػ�û����ȫ����ʱ�������ٴ�׷�ӵ��¸��ǵ�����;

	}, {
		key: 'isBug',
		value: function isBug(target) {
			var _this = this;

			var getDiff = function getDiff(target) {
				return _this.bullPipe.filter(function (v) {
					// �жϴ����ӽڵ�ʱ��ɸѡ��׷�ӵĹܵ�
					if (!!v.childNodes.length) {
						return parseInt(window.getComputedStyle(v.childNodes[v.childNodes.length - 1]).right) > 0 && v !== target;
					}
				});
			};
			// ��ȡ����һ��Ԫ�ؽ����ж� �ò��ֿ��Ż�......
			if (target.childNodes.length > 0) {
				var lastBull = target.childNodes[target.childNodes.length - 1];
				var lastBullRight = parseInt(window.getComputedStyle(lastBull).right);
				if (lastBullRight < 0) {
					// ����ȡ������������һ���ܵ�
					return getDiff(target).length && getDiff(target)[parseInt(Math.random() * getDiff(target).length)];
				}
				return false;
			}
			return false;
		}
		// ������Ļ

	}, {
		key: 'drawBull',
		value: function drawBull(param) {
			var _getRandomParam = this.getRandomParam(),
			    color = _getRandomParam.color;

			var span = document.createElement('P');
			var len = param.length;
			//�����ܵ�
			var currPipe = this.bullPipe[parseInt(Math.random() * 12)];

			span.innerHTML = param;
			span.className = 'bb';
			span.style.top = 0 + 'px';
			span.style.right = -(20 + len * 16) + 'px';
			span.style.color = color;

			// �ܵ����� ������ǰ�ܵ���Ԫ�� �����ж��Ƿ���ȫ����ʾ �����漴����һ�����ϵĹܵ���������
			if (this.isBug(currPipe)) {
				this.isBug(currPipe).appendChild(span);
			} else {
				currPipe.appendChild(span);
			}
			this.bullanimate(span);
		}
		// ����������

	}, {
		key: 'bullanimate',
		value: function bullanimate(target) {
			var options = this.options;

			var that = this;
			var num = -target.offsetWidth,
			    speed = options.speed || 0.6;
			var autoRun = function autoRun() {
				num += speed;
				target.style.right = num + 'px';
				// ��ÿ����Ļ��ȫ����������ʱ�����ٲ������Ķ�ʱ��
				if (num > that.box.offsetWidth + target.offsetWidth) {
					target.parentNode.removeChild(target);
					clearInterval(timer);
				}
			};
			var timer = setInterval(autoRun, 13);
		}
		// ���͵�Ļ

	}, {
		key: 'bindEvent',
		value: function bindEvent() {
			var _this2 = this;

			this.sendBtn.onclick = function () {
				var data = _this2.userData.value;
				if (!data) {
					return;
				}
				setTimeout(function () {
					_this2.drawBull(data);
				}, 100);
			};
		}
	}]);

	return Bull;
}();

var bullReal = new Bull({
	box: '.box',
	btn: '#btn',
	input: '#input',
	speed: 0.5
});
bullReal.init();