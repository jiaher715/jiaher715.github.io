$(document).ready(function() {
    var songlist;
    var GuessCorrect = 0;
    var guessTime;

    $.ajax({
        url: 'song.json',
        async: false,
        dataType: 'json',
        success: function(json) {
            assignVariable(json);
        },
        error: function(err) {
            console.log(err)
        }
    });

    function assignVariable(data) {
        songlist = (data.song).sort(randomsort);
    }

    function randomsort(a, b) {
        return Math.random() > .5 ? -1 : 1;
        //用Math.random()函式生成0~1之間的隨機數與0.5比較，返回-1或1
    }

    $('#start').click(function() {
        $('#left').text(`你還剩下${songlist.length}題`)
        $('#start').remove()
        $('#next').css('display', 'inline-block')
        var input = `<input type="text" id="userAns" required>`
        $('.root').append(input)
        $('#playSong').remove();
        $('#userAns').val('');
        var nowSongObj = (songlist.shift())
        var nowSong = nowSongObj.url;
        var nowSongAns = nowSongObj.songname;
        console.log(nowSongObj)
        var audioEl = `<audio controls id="playSong" data-ans="${nowSongAns}"><source src="${nowSong}" type="audio/mp3"></audio>`
        $('.root').append(audioEl)
    })

    $('#next').on('click', function() {
        $('#left').text(`你還剩下${songlist.length}題`)
        if (songlist.length == 0) {
            $('#next').remove();
            $('#result').css('display', 'inline-block')
        }
        var userAns = $('#userAns').val();
        var correctAns = $('#playSong').data('ans')
        console.log(userAns)
        if (songlist.length >= 1) {
            if (userAns == correctAns) {
                alert('恭喜你答對了這題！')
                GuessCorrect = GuessCorrect + 1;

            } else {
                alert('xx！你錯了qq')
            }
            $('#playSong').remove();
            $('#userAns').val('');
            var nowSongObj = (songlist.shift())
            var nowSong = nowSongObj.url;
            var nowSongAns = nowSongObj.songname;
            console.log(nowSongObj)
            var audioEl = `<audio controls id="playSong" data-ans="${nowSongAns}"><source src="${nowSong}" type="audio/mp3"></audio>`
            $('.root').append(audioEl)
        }
        console.log(GuessCorrect)
    })

    $('#result').on('click', function() {
        var userAns = $('#userAns').val();
        var correctAns = $('#playSong').data('ans')
        if (userAns == correctAns) {
            GuessCorrect = GuessCorrect + 1;

        }
        $('#left').remove();
        $('.root').empty();
        $('.root').text(`恭喜你的答對${GuessCorrect}題`)
        if (GuessCorrect >= 0 && GuessCorrect <= 5) {
            $('#finalPic').attr('src', './assets/pic/c05.JPEG')
            $('#finalPic').css('display', 'block')
        }
        if (GuessCorrect >= 6 && GuessCorrect <= 10) {
            $('#finalPic').attr('src', './assets/pic/c610.JPEG')
            $('#finalPic').css('display', 'block')
        }
        if (GuessCorrect >= 11 && GuessCorrect <= 15) {
            $('#finalPic').attr('src', './assets/pic/c19.JPEG')
            $('#finalPic').css('display', 'block')
        }
        if (GuessCorrect >= 16 && GuessCorrect <= 18) {
            $('#finalPic').attr('src', './assets/pic/c1115.JPEG')
            $('#finalPic').css('display', 'block')
        }
        if (GuessCorrect == 19) {
            $('#finalPic').attr('src', './assets/pic/c20.JPEG')
            $('#finalPic').css('display', 'block')
        }
        if (GuessCorrect == 20) {
            $('#finalPic').attr('src', './assets/pic/c1618.JPEG')
            $('#finalPic').css('display', 'block')
        }
    })

})