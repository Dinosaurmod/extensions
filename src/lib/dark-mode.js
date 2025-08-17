$(document).ready(function(){
    $('#icon').click(function(){
        $('nav ul').toggleClass('show');
    });

    const storedMode = localStorage.getItem('mode');
    if (storedMode) {
        applyMode(storedMode);
    }

    $('#darkModeToggle').click(function(){
        const isDarkMode = $('body').hasClass('dark-mode');
        const newMode = isDarkMode ? 'light-mode' : 'dark-mode';
        
        localStorage.setItem('mode', newMode);

        applyMode(newMode);
    });

    function applyMode(mode) {
        $('body').removeClass('dark-mode light-mode').addClass(mode);
        $('nav').removeClass('dark-mode light-mode').addClass(mode);
        $('section').removeClass('dark-mode light-mode').addClass(mode);
        $('footer').removeClass('dark-mode light-mode').addClass(mode);
        $('.footer-row a').removeClass('dark-mode light-mode').addClass(mode);
        $('.section-info').removeClass('dark-mode light-mode').addClass(mode);
        $('.menu-bar_languages-dropdown').removeClass('dark-mode light-mode').addClass(mode);
        $('.menu-bar_language-option').removeClass('dark-mode light-mode').addClass(mode);
        $('#recent-changes').removeClass('dark-mode light-mode').addClass(mode);
        $('#signup-div').removeClass('dark-mode light-mode').addClass(mode);
        $('.commit-list .commit, .commit-info, .commit-title, .author-name, .commit-date, .avatar').each(function () {
            $(this).removeClass('dark-mode light-mode').addClass(mode);
        });
        $('#error-message').removeClass('dark-mode light-mode').addClass(mode);
    }
});