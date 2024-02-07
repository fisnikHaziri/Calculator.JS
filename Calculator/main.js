var calcHistory = [];
var curentNumbers = [];
var curentOperator = [null];
var num1 = 0,
	sum = 0;
$(document).keypress((event) => {
	logic(event.key);
});
//Almost jumped of the window at 3AM wondering why i couldnt place the switch inside the for loop...... i forgot the ' '	<--- Ended up figuring out how to doo it without the ' ' *FP*
$(document).keydown((event) => {
	if (event.key == 'Backspace') {
		$('#backspace').addClass('clicked');
		curentNumbers.pop();
		calcHistory.pop();
		$('#curentNum').text(curentNumbers.join(''));
		$('#activeHistory').text(calcHistory.join(''));
		setTimeout(() => {
			$('#backspace').removeClass('clicked');
		}, 250);
	}
	//This for the backspace cant use it for the other ones that require 2 keypresses tho (*)... And thats the difference betwen keypress and keydown
});

$('.button').click(function (event) {
	console.log(event.currentTarget.id);
	logic(event.currentTarget.id);
});

function restart() {
	$(document).keypress((event) => {
		logic(event.key);
	});
}

function logic(listener) {
	//From here ->
	for (let i = 0; i <= 9; i++) {
		switch (+listener) {
			case i:
				$('#' + i).addClass('clicked');
				curentNumbers.push(i);
				calcHistory.push(i);
				$('#curentNum').text(curentNumbers.join(''));
		}
	}
	setTimeout(() => {
		$('.button').removeClass('clicked');
	}, 250);
	//To here This bit is dooing its job very well
	switch (listener) {
		//this MF the problematic child
		case 'add':
		case '+':
			$('#add').addClass('clicked');
			calcHistory.push('+');
			curentOperator.push('+');
			theActualMath(curentOperator[curentOperator.length - 2]);
			break; // Adding is done
		case 'extract':
		case '-':
			$('#extract').addClass('clicked');
			calcHistory.push('-');
			curentOperator.push('-');
			theActualMath(curentOperator[curentOperator.length - 2]);
			break; //extracting is done
		case 'devide':
		case '/':
			$('#devide').addClass('clicked');
			calcHistory.push('/');
			curentOperator.push('/');
			theActualMath(curentOperator[curentOperator.length - 2]);
			break; // deviding is done
		case 'multiply':
		case '*':
			$('#multiply').addClass('clicked');
			calcHistory.push('*');
			curentOperator.push('*');
			theActualMath(curentOperator[curentOperator.length - 2]);
			break; // multiplying is done
		case 'percentage':
		case '%':
			$('#percentage').addClass('clicked');
			calcHistory.push('%');
			curentOperator.push('%');
			theActualMath(curentOperator[curentOperator.length - 2]);
			break;
		case 'equals':
		case '=':
			$('#equals').addClass('clicked');
			theActualMath(curentOperator[curentOperator.length - 1]);
			break; // equals does its job
		case 'dot':
		case '.':
			$('#dot').addClass('clicked');
			curentNumbers.push('.');
			calcHistory.push('.');
			$('#curentNum').text(curentNumbers.join(''));
			break; // added thee decimal numbers
		case 'clear':
		case 'clearAll':
			calcHistory = [];
			curentNumbers = [];
			curentOperator = [null];
			num1 = 0;
			sum = 0;
			$('#curentNum').text(0);
			break; // both of these do the same thing in my mind so i just made them do the same thing here as well
		case 'squareRoot':
			calcHistory.push('√');
			curentOperator.push('√');
			theActualMath(curentOperator[curentOperator.length - 1]);
			break;
		case 'backspace':
			curentNumbers.pop();
			calcHistory.pop();
			$('#curentNum').text(curentNumbers.join(''));
			$('#activeHistory').text(calcHistory.join(''));
			break; // backspace done as well ofc
		case 'powerOf2':
			calcHistory.push('²');
			curentOperator.push('²');
			theActualMath(curentOperator[curentOperator.length - 1]);
			break;

		case 'devideOne':
			calcHistory.push();
			theActualMath('devideOne');
			break;
		case 'inverse':
			theActualMath('inverse');
	}
	$('#activeHistory').text(calcHistory.join(''));
}
//EVERYTHING GETTING DELETED FTHIS
function theActualMath(operatori) {
	num1 = +curentNumbers.join('');
	switch (operatori) {
		case '+':
			sum += num1;
			break;
		case '-':
			sum -= num1;
			break;
		case '*':
			sum *= num1;
			break;
		case '/':
			sum = Number((sum / num1).toPrecision(4));
			break;
		case '%':
			sum += Number((num1 / 100).toPrecision(4));
			break;
		case '√':
			sum += Number(Math.pow(num1, 0.5).toPrecision(4));
			break;
		case '²':
			sum += Number(Math.pow(num1, 2).toPrecision(4));
			break;
		case 'devideOne':
			sum += Number((1 / num1).toPrecision(4));
			break;
		case 'inverse':
			sum = sum * -1;
			break;
	}
	if (sum == 0) {
		sum = num1;
	} else if (sum == Infinity || sum == NaN) {
		sum = 0;
	}	
	$('#curentNum').text(sum);
	num1 = 0;
	curentNumbers = [];
}
//All that has to be done now is fix the order of exe
//Kinda done   <----- Update not kinda but 90% done atp
