var MAX_RECENT_SYMBOLS_QUATITY = 16;
auto_copy_option = true

MANUAL_COPY_MSG = 'Press "Ctrl + C" to copy';
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i ['test'](navigator['userAgent'])) {
    MAX_RECENT_SYMBOLS_QUATITY = 4;
    MANUAL_COPY_MSG = 'Selected for copying'
};

function setAutoCopyEmoji() {
    emojiAutoCopy = new Clipboard('.eq');
    emojiAutoCopy['on']('success', function(_0xc50cx3) {
        _0xc50cx3['clearSelection']();
        document['getElementById']('copy_notification')['textContent'] = '  Copied';
        window['setTimeout'](function() {
            document['getElementById']('copy_notification')['textContent'] = ''
        }, 5000)
    })
}

function search_emojis() {
    $('#search-emojis-results')['empty']();
    var _0xc50cx5 = $('#search-emojis-input')['val']()['toLowerCase']()['trim']();
    var _0xc50cx6 = 0;
    if (_0xc50cx5['length'] > 0) {
        $('#symbols-content-container .symbol-content .eq')['each'](function() {
            if (($(this)['attr']('title') + ' ' + $(this)['data']('emoji-keywords'))['toLowerCase']()['indexOf'](_0xc50cx5) >= 0) {
                $('#search-emojis-results')['append']($(this)['clone']());
                _0xc50cx6++
            } else {
                if ($(this)['attr']('data-emoji') == _0xc50cx5['trim']()) {
                    $('#search-emojis-results')['append']($(this)['clone']());
                    var _0xc50cx7 = '<span>&nbsp;&nbsp; - ' + $(this)['attr']('title') + '</span>';
                    $('#search-emojis-results')['append'](_0xc50cx7);
                    _0xc50cx6++
                }
            }
        })
    } else {
        $('#symbols-content-container .symbol-content .eq')['each'](function() {
            $('#search-emojis-results')['append']($(this)['clone']());
            _0xc50cx6++
        })
    };
    var _0xc50cx8 = 'MATCH';
    if (_0xc50cx6 >= 2) {
        _0xc50cx8 = 'MATCHES'
    };
    var _0xc50cx9 = '<br/><span><em>' + _0xc50cx6 + ' ' + _0xc50cx8 + '</em></span>';
    $('#search-emojis-results')['append'](_0xc50cx9)
}

function add_symbol_to_recent_list(_0xc50cxb, _0xc50cxc) {
    var _0xc50cxd = _0xc50cxc['length'];
    for (var _0xc50cxe = 0; _0xc50cxe < _0xc50cxd; _0xc50cxe++) {
        if (_0xc50cxb['symbol'] == _0xc50cxc[_0xc50cxe]['symbol']) {
            _0xc50cxc['splice'](_0xc50cxe, 1);
            break
        }
    };
    while (_0xc50cxc['length'] >= MAX_RECENT_SYMBOLS_QUATITY) {
        _0xc50cxc['pop']()
    };
    _0xc50cxc['unshift'](_0xc50cxb);
    Cookies['set']('recent_symbols_list', _0xc50cxc, {
        expires: 10
    })
}

function update_recent_symbols_list(_0xc50cxc) {
    var _0xc50cx10 = '';
    var _0xc50cxd = _0xc50cxc['length'];
    for (var _0xc50cxe = 0; _0xc50cxe < _0xc50cxd; _0xc50cxe++) {
        var _0xc50cx11 = _0xc50cxc[_0xc50cxe];
        _0xc50cx10 = _0xc50cx10 + '<span class="' + _0xc50cx11['class'] + ' recent_emoji"     data-symbol="' + _0xc50cx11['symbol'] + '"     title="' + _0xc50cx11['title'] + '" data-clipboard-text="' + _0xc50cx11['symbol'] + '">' + _0xc50cx11['symbol'] + '</span>';;
    };
    if (_0xc50cxd == 0) {
        $('#recent_symbols')['hide']()
    } else {
        $('#recent_symbols')['show']()
    };
    $('#recent_symbols_list')['html'](_0xc50cx10)
}

function is_in_windows_os_w_chrome() {
    var _0xc50cx13 = navigator['userAgent']['toLowerCase']();
    return /windows/ ['test'](_0xc50cx13) && /chrom(e|ium)/ ['test'](_0xc50cx13)
}
$(document)['ready'](function() {
    var _0xc50cxc = Cookies['getJSON']('recent_symbols_list');
    if (!_0xc50cxc) {
        _0xc50cxc = []
    };
    update_recent_symbols_list(_0xc50cxc);
    $('#symbols-content-container,#recent_symbols_list')['on']('click', '.eq', function() {
        var _0xc50cx14 = $(this)['data']('symbol');
        _0xc50cx1c('symbol-message', _0xc50cx14);
        var _0xc50cx15 = $(this)['attr']('class');
        var _0xc50cx16 = $(this)['attr']('title');
        var _0xc50cx17 = {
            "\x63\x6C\x61\x73\x73": _0xc50cx15,
            "\x74\x69\x74\x6C\x65": _0xc50cx16,
            "\x73\x79\x6D\x62\x6F\x6C": _0xc50cx14
        };
        if (_0xc50cx15['indexOf']('recent_emoji') < 0) {
            add_symbol_to_recent_list(_0xc50cx17, _0xc50cxc);
            update_recent_symbols_list(_0xc50cxc)
        };
        $(this)['animate']({
            backgroundColor: 'yellow'
        }, 300);
        $(this)['animate']({
            backgroundColor: 'lightgray'
        }, 150);
        if (auto_copy_option) {};
        ga('send', 'event', 'Symbol', 'Clicked', _0xc50cx14)
    });
    if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i ['test'](navigator['userAgent'])) {
        $('#symbols-content-container,#recent_symbols_list')['on']('mouseenter', '.eq', function() {
            $(this)['css']('border-color', '#ff3300');
            $(this)['css']('margin-top', '-5px');
            var _0xc50cx14 = $(this)['data']('symbol');
            var _0xc50cx18 = $(this)['attr']('title');
            var _0xc50cx19 = '<span id="current_hovered_symbol"> ' + _0xc50cx14 + ' </span> ' + _0xc50cx18 + '<span id=\'copy_notification\'></span>';
            $('#current_symbol_title')['html'](_0xc50cx19)
        });
        $('#symbols-content-container,#recent_symbols_list')['on']('mouseleave', '.eq', function() {
            $('#current_symbol_title')['html']('<span id="current_hovered_symbol">&nbsp;</span><span id="copy_notification"></span>');
            $(this)['css']('border-color', '#000000');
            $(this)['css']('margin-top', '0px')
        })
    };
    if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i ['test'](navigator['userAgent'])) {
        $('#symbols-content-container,#recent_symbols_list')['on']('mouseenter', '.keypad', function() {
            $(this)['css']('border-color', '#ff3300');
            $(this)['css']('top', '-3px')
        });
        $('#symbols-content-container,#recent_symbols_list')['on']('mouseleave', '.keypad', function() {
            $(this)['css']('border-color', '#e3e3e3');
            $(this)['css']('top', '0px')
        })
    };
    var _0xc50cx1a = $('#search-emojis-input');
    _0xc50cx1a['on']('input propertychange updateInfo', search_emojis);
    _0xc50cx1a['on']('paste', function() {
        setTimeout(function() {
            search_emojis()
        }, 10)
    });
    var _0xc50cx1b = new Clipboard('#copy-btn');
    _0xc50cx1b['on']('success', function(_0xc50cx3) {
        _0xc50cx3['clearSelection']();
        document['getElementById']('copy_text')['textContent'] = 'Copied';
        window['setTimeout'](function() {
            document['getElementById']('copy_text')['textContent'] = 'Copy message '
        }, 3000)
    });
    _0xc50cx1b['on']('error', function(_0xc50cx3) {
        document['getElementById']('copy_text')['textContent'] = MANUAL_COPY_MSG;
        window['setTimeout'](function() {
            document['getElementById']('copy_text')['textContent'] = 'Copy message '
        }, 3000)
    });

    function _0xc50cx1c(_0xc50cx1d, _0xc50cx1e) {
        var _0xc50cx1f = document['getElementById'](_0xc50cx1d);
        var _0xc50cx20 = _0xc50cx1f['scrollTop'];
        var _0xc50cx21 = _0xc50cx1f['selectionStart'];
        var _0xc50cx22 = (_0xc50cx1f['value'])['substring'](0, _0xc50cx21);
        var _0xc50cx23 = (_0xc50cx1f['value'])['substring'](_0xc50cx1f['selectionEnd'], _0xc50cx1f['value']['length']);
        _0xc50cx1f['value'] = _0xc50cx22 + _0xc50cx1e + _0xc50cx23;
        _0xc50cx21 = _0xc50cx21 + _0xc50cx1e['length'];
        _0xc50cx1f['selectionStart'] = _0xc50cx21;
        _0xc50cx1f['selectionEnd'] = _0xc50cx21;
        _0xc50cx1f['scrollTop'] = _0xc50cx20
    }

    function _0xc50cx24(_0xc50cx1d) {
        var _0xc50cx1f = document['getElementById'](_0xc50cx1d);
        var _0xc50cx20 = _0xc50cx1f['scrollTop'];
        var _0xc50cx21 = _0xc50cx1f['selectionStart'];
        var _0xc50cx22 = (_0xc50cx1f['value'])['substring'](0, _0xc50cx21 - 1);
        var _0xc50cx23 = (_0xc50cx1f['value'])['substring'](_0xc50cx1f['selectionEnd'], _0xc50cx1f['value']['length']);
        _0xc50cx1f['value'] = _0xc50cx22 + _0xc50cx23;
        _0xc50cx21 = _0xc50cx21 - 1;
        _0xc50cx1f['selectionStart'] = _0xc50cx21;
        _0xc50cx1f['selectionEnd'] = _0xc50cx21;
        _0xc50cx1f['scrollTop'] = _0xc50cx20
    }
    $('a[data-toggle="tab"]')['on']('shown.bs.tab', function(_0xc50cx25) {
        var _0xc50cx26 = $(_0xc50cx25['target'])['attr']('href');
        if (_0xc50cx26 == '#search-emojis') {
            search_emojis();
            $('#search-emojis-input')['focus']()
        }
    });
    $('#clear-btn')['click'](function() {
        $('#symbol-message')['val']('')
    });
    $('[name=\'auto-copy-option-switcher\']')['bootstrapSwitch']();
    if (auto_copy_option) {
        $('input[name="auto-copy-option-switcher"]')['bootstrapSwitch']('state', true, true)
    } else {
        $('input[name="auto-copy-option-switcher"]')['bootstrapSwitch']('state', false, true)
    };
    $('input[name="auto-copy-option-switcher"]')['on']('switchChange.bootstrapSwitch', function(_0xc50cx3, _0xc50cx27) {
        auto_copy_option = _0xc50cx27;
        if (_0xc50cx27) {
            setAutoCopyEmoji();
            Cookies['set']('auto_copy_emoji_option', 'yes', {
                expires: 30
            })
        } else {
            emojiAutoCopy['destroy']();
            Cookies['set']('auto_copy_emoji_option', 'no', {
                expires: 30
            })
        }
    });
    if (auto_copy_option) {
        setAutoCopyEmoji()
    }
})