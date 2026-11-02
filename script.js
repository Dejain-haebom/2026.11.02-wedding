// 사진 버튼을 누르면 화면 위에 크게 보여줍니다.
const photoModal = document.getElementById('photoModal');
const modalImage = document.getElementById('modalImage');
const closePhoto = document.querySelector('.modal-close');

document.querySelectorAll('[data-photo]').forEach((button) => {
  button.addEventListener('click', () => {
    // assets 폴더 안의 실제 이미지 파일을 모달에 연결합니다.
    modalImage.src = `assets/${button.dataset.photo}`;
    photoModal.classList.add('open');
    photoModal.setAttribute('aria-hidden', 'false');
  });
});

function hidePhotoModal() {
  photoModal.classList.remove('open');
  photoModal.setAttribute('aria-hidden', 'true');
  modalImage.src = '';
}
closePhoto.addEventListener('click', hidePhotoModal);
photoModal.addEventListener('click', (event) => {
  if (event.target === photoModal) hidePhotoModal();
});

// 계좌번호 복사 후 별도의 안내 팝업을 표시합니다.
const copyModal = document.getElementById('copyModal');
const copiedNumber = document.getElementById('copiedNumber');
const closeToast = document.getElementById('closeToast');

document.querySelectorAll('.copy-btn').forEach((button) => {
  button.addEventListener('click', async () => {
    const accountNumber = button.dataset.copy;
    try {
      await navigator.clipboard.writeText(accountNumber);
      copiedNumber.textContent = accountNumber;
      copyModal.classList.add('open');
      copyModal.setAttribute('aria-hidden', 'false');
    } catch (error) {
      // 로컬 파일 등에서 브라우저 복사 권한이 없을 때도 번호를 안내합니다.
      copiedNumber.textContent = `${accountNumber} (길게 눌러 복사해 주세요)`;
      copyModal.classList.add('open');
      copyModal.setAttribute('aria-hidden', 'false');
    }
  });
});

function hideCopyModal() {
  copyModal.classList.remove('open');
  copyModal.setAttribute('aria-hidden', 'true');
}
closeToast.addEventListener('click', hideCopyModal);
copyModal.addEventListener('click', (event) => {
  if (event.target === copyModal) hideCopyModal();
});

// ESC 키로 열려 있는 팝업을 닫습니다.
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    hidePhotoModal();
    hideCopyModal();
  }
});

// 갤러리 더 보기 버튼은 현재 갤러리 영역으로 이동합니다.
document.getElementById('morePhotos').addEventListener('click', () => {
  document.querySelector('.gallery-grid').scrollIntoView({ behavior: 'smooth', block: 'center' });
});
