window.addEventListener('DOMContentLoaded', () => {

    const modalElement = document.querySelector('.modal'),
          modalElementWrapper = document.querySelector('.modal__wrapper'),
          modalBtn = document.querySelector('#modalBtn'),
          modalCloseBtn = document.querySelector('#CloseBtn');

    modalBtn.addEventListener('click', openModal);
    modalCloseBtn.addEventListener('click', closeModal);
    modalElement.addEventListener('click', closeModalOnOutsideClick);
    document.addEventListener('keydown', closeModalOnKey);
    window.addEventListener('scroll', openModalByScroll);
    
    function openModal() {
        modalElement.classList.add('modal-show');
        modalElementWrapper.classList.add('modal-show-scale');
        toggleBodyOverflow();
        clearTimeout(modalTimer);
    }

    function closeModal() {
        modalElement.classList.remove('modal-show');
        modalElementWrapper.classList.remove('modal-show-scale');
        modalElement.classList.add('modal-hide');
        toggleBodyOverflow();
    }

    function closeModalOnOutsideClick(e) {
        const target = e.target;

        if (target === modalElement && target.classList.contains('modal')) {
            closeModal();
        }
    }

    function closeModalOnKey(e) {
        const code = e.code;

        if (code === 'Escape' && modalElement.classList.contains('modal-show')) {
            closeModal();
        }
    }
    
    function toggleBodyOverflow() {
        document.body.style.overflow = (document.body.style.overflow === '') ? 'hidden' : '';
        const scrollBarWidth = getScrollBarWidth();
        document.documentElement.style.paddingRight = (document.body.style.overflow === 'hidden') ? scrollBarWidth + 'px' : '';
    }

    function getScrollBarWidth() {
        const div = document.createElement('div');
        div.style.overflow = 'scroll';
        div.style.visibility = 'hidden';
        document.body.append(div);

        const scrollBarWidth = div.offsetWidth - div.clientWidth;
        document.body.removeChild(div);

        return scrollBarWidth;
    }

    function openModalByScroll() {
        const offsetY = window.pageYOffset;
        const height = document.documentElement.clientHeight;
        const scrollHeight = document.documentElement.scrollHeight;

        if (offsetY + height >= scrollHeight - 1) {
            openModal();
            window.removeEventListener('scroll', openModalByScroll);
        }
    }

    const modalTimer = setTimeout(openModal, 10000);

});