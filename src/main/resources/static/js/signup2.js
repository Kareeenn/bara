var useable = false; //닉네임 중복확인 해야지 true됨
var email = sessionStorage.getItem('userEmail');

//닉네임
document.getElementById('checkDuplicate').addEventListener('click', function(event) {
    event.preventDefault();

    var nickname = document.getElementById('nickname').value;

    fetch('http://localhost:8080/members/signup2/nickname', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nickname: nickname })
    })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                alert(data.error);
                useable = false;
            } else {
                alert(data.message);
                //useable변수 true로 바꿈, 이후 useable true여야 페이지 넘어가게
                useable = true;
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
});

document.getElementById('completeSignup').addEventListener('click', function(event) {
    event.preventDefault();

    var nickname = document.getElementById('nickname').value;
    var password = document.getElementById('inputPw').value;
    var passwordCheck = document.getElementById('inputPwCheck').value;

    // 비밀번호와 비밀번호 확인이 일치하는지 검사 - 눌렀을 때 검사되어야 되는데 제대로 되려나?
    if (password !== passwordCheck) {
        alert('비밀번호가 일치하지 않습니다.');
        return;
    }

    let member = {
        email: email,
        name: nickname,
        password: password
    };

    fetch('http://localhost:8080/members/signup2', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(member)
    })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                alert(data.error);
            } else {

                console.log('Signup successful');
                console.log(JSON.stringify(member));
                alert(data.message);
                window.location.href = '/login';
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
});
