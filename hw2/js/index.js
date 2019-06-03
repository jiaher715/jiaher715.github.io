// 當文件已經全載入至記憶體時，開始執行程式
$(document).ready(function() {

    // 清空 product-list
    $('#product-list').empty();
    $('#page').hide()

    var items = null
    var pageCount = 20
    var showItems = (page) => {
        if (items == null) return
        if(page == (Math.ceil(items.length/20))){
            var start = (page - 1) * pageCount
            var end = items.length - 1
            $('#product-list').empty();
            for (var i = start; i <= end; i++) {
                newItem(items[i])
            }
        }
        else{
             var start = (page - 1) * pageCount
            var end = start + pageCount - 1
            $('#product-list').empty();
            for (var i = start; i <= end; i++) {
                newItem(items[i])
            }
        }
       
    }

    var newItem = (item) => {
        $img = $('<img>').attr('class', 'image').attr('src', item.image)
        $h3 = $('<h3>').attr('class', 'name').text(item.name)
        $p = $('<p>').attr('class', 'price').text('NT$ ' + item.price)

        $item = $('<div>').attr('class', 'item').append($img).append($h3).append($p)
        $col = $('<div>').attr('class', 'col-*').append($item)

        $('#product-list').append($col)
    }

    var newPage = (n) => {
        var pageNum = n / 20
        pageNum = (n % 20 != 0) ? pageNum + 1 : pageNum

        $('#page-number').empty()

        $la = $('<a>').attr('class', 'page-link').attr('href', '#').attr('tabindex', '-1').attr('aria-disabled', 'true').text('«')
        $lli = $('<li>').attr('class', 'page-item').attr('id','front').addClass('disabled').append($la)

        $('#page-number').append($lli)

        // 插入分頁數字
        for (var i = 1; i <= pageNum; i++) {
            $a = $('<a>').attr('class', 'page-link').attr('href', '#').text(i)
            $a.on('click', function() {
                console.log($(this).parent().attr('id'));
                    $('.page-item').attr('class','page-item')
                    $(this).parent().attr('class','page-item active')
                    var i = $(this).text()
                    if(i=='1'){
                        $('#front').addClass('disabled')
                    }
                    if(i==Math.floor(pageNum)){
                        $('#back').addClass('disabled')
                    }
                    showItems(Number(i))
                    console.log(i)
                
            })

            var strActive = ((i == 1) ? ' active' : '')
            $li = $('<li>').attr('class', 'page-item' + strActive).append($a)
            $('#page-number').append($li)
        }

        $ra = $('<a>').attr('class', 'page-link').attr('href', '#').text('»')
        $rli = $('<li>').attr('class', 'page-item').attr('id','back').append($ra)
        $('#page-number').append($rli)
    }

    $('#query').on('click', function() {
        $.get('https://js.kchen.club/B06104029/query', function(response) {
            if (response) {
                // 伺服器有回傳資料
                if (response.result) {
                    $('#product-list').empty();
                    // 資料庫有回傳資料
                    items = response.items
                    console.log(items)
                     for (var i = 0; i < items.length; i++) {
                        newItem(items[i])
                     }

                    // 加了分頁效果，預設顯示第一頁
                    showItems(1)

                    // 顯示分頁和設定分頁的函式
                    $('#page').show()
                    newPage(items.length)

                } else {
                    $('#message').text('查無相關資料')
                    $('#dialog').modal('show')
                }
            } else {
                $('#message').text('伺服器出錯')
                $('#dialog').modal('show')
            }

            console.log(response)
        }, "json")
    })

    $('body').on('click','#front',function(){
        var nowPage = $('.active').children().text();
        if(nowPage!=1){
           showItems(nowPage-1)
           var toPage=nowPage-1
           $('.page-item').attr('class','page-item')
           $(".page-link:contains('" + toPage + "')" ).parent().attr('class','page-item active')
           if(toPage == 1){
            $('#front').addClass('disabled')
           }
        }
        else{
            alert('You are on the first page')
        }
    })

    $('body').on('click','#back',function(){
        var nowPage = $('.active').children().text();
        if(nowPage!=9){
           showItems(parseInt(nowPage)+1)
           var toPage=parseInt(nowPage)+1
           console.log(toPage)
           $('.page-item').attr('class','page-item')
           $(".page-link:contains('" + toPage + "')" ).parent().attr('class','page-item active')
           if(toPage == 9){
            $('#back').addClass('disabled')
           }
        }
        else{
            alert('You are on the last page')
        }
    })

    $('#search').on('click',function(){
        $.get('https://js.kchen.club/B06104029/query', function(response) {
            if (response) {
                // 伺服器有回傳資料
                if (response.result) {
                    $('#product-list').empty();
                    $('#page-number').empty();
                    // 資料庫有回傳資料
                    items = response.items
                    var newSearchResult = [] 
                    var searchTerm = $('#searchProduct').val();
                    for(var x = 0 ; x<items.length ; x++){
                        if((items[x].name).includes(searchTerm)){
                            newSearchResult.push(items[x])
                        }
                    }
                    console.log(newSearchResult)
                     for (var i = 0; i < newSearchResult.length; i++) {
                        newItem(newSearchResult[i])
                     }

                    // 加了分頁效果，預設顯示第一頁
                    /*showItems(1)

                    // 顯示分頁和設定分頁的函式
                    $('#page').show()
                    newPage(newSearchResult.length)*/

                } else {
                    $('#message').text('查無相關資料')
                    $('#dialog').modal('show')
                }
            } else {
                $('#message').text('伺服器出錯')
                $('#dialog').modal('show')
            }

            console.log(response)
        }, "json")
    })
})

