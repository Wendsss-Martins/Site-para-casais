document.addEventListener('DOMContentLoaded', () => {
  
    const btnMemories = document.getElementById('btnMemories');
    const gallery = document.getElementById('gallery');
    const bgMusic = document.getElementById('bgMusic');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const galleryHeader = document.querySelector('.gallery-header');
    const finalContent = document.querySelector('.final-content');
    
    // Modal
    const modal = document.getElementById('modal');
    const modalOverlay = document.getElementById('modalOverlay');
    const modalClose = document.getElementById('modalClose');
    const modalImage = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalCaption');


btnMemories.addEventListener('click', () => {

    if (bgMusic.paused) {

        const maxVolume = 0.1;

        bgMusic.volume = 0;
        bgMusic.play().catch(() => {});

        const fade = setInterval(() => {

            if (bgMusic.volume < maxVolume) {
                bgMusic.volume += 0.01;
            } else {
                bgMusic.volume = maxVolume;
                clearInterval(fade);
            }

        }, 200);

    }

    gallery.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });



    gallery.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });

});


    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    // Observer para elementos que aparecem ao rolar
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Adiciona delay escalonado para itens da galeria
                const delay = entry.target.classList.contains('gallery-item') 
                    ? index * 100 
                    : 0;
                
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);
                
                // Para de observar após animar
                fadeObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observa o header da galeria
    if (galleryHeader) {
        fadeObserver.observe(galleryHeader);
    }

    // Observa cada item da galeria
    galleryItems.forEach((item, index) => {
        // Adiciona delay customizado via CSS
        item.style.animationDelay = `${index * 0.1}s`;
        fadeObserver.observe(item);
    });

    // Observa a seção final
    if (finalContent) {
        fadeObserver.observe(finalContent);
    }

   
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            const caption = item.getAttribute('data-caption') || '';
            
            // Preenche o modal
            modalImage.src = img.src;
            modalImage.alt = img.alt;
            modalCaption.textContent = caption;
            
            // Abre o modal
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

   
    const closeModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        
        // Limpa após transição
        setTimeout(() => {
            modalImage.src = '';
            modalCaption.textContent = '';
        }, 400);
    };

    // Fechar ao clicar no X
    modalClose.addEventListener('click', closeModal);
    
    // Fechar ao clicar no overlay
    modalOverlay.addEventListener('click', closeModal);
    
    // Fechar com tecla ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

 //navegacao do teclado com modal//
    document.addEventListener('keydown', (e) => {
        if (!modal.classList.contains('active')) return;
        
        const items = Array.from(galleryItems);
        const currentSrc = modalImage.src;
        const currentIndex = items.findIndex(item => 
            item.querySelector('img').src === currentSrc
        );
        
        let newIndex = currentIndex;
        
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
            newIndex = (currentIndex + 1) % items.length;
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            newIndex = (currentIndex - 1 + items.length) % items.length;
        }
        
        if (newIndex !== currentIndex) {
            const newItem = items[newIndex];
            const newImg = newItem.querySelector('img');
            const newCaption = newItem.getAttribute('data-caption') || '';
            
            modalImage.src = newImg.src;
            modalImage.alt = newImg.alt;
            modalCaption.textContent = newCaption;
        }
        
    });

   //carregamento//
    console.log('Site carregado com sucesso! Para a Rayssa com amor.');
// ===============================
// CONTADOR DE TEMPO DE NAMORO
// ===============================

// Altere para a data de início do namoro
const startDate = new Date("2025-02-13T20:00:00");

function updateLoveCounter() {

    const now = new Date();

    let years = now.getFullYear() - startDate.getFullYear();
    let months = now.getMonth() - startDate.getMonth();
    let days = now.getDate() - startDate.getDate();

    // Ajuste dos dias
    if (days < 0) {
        months--;

        const lastMonth = new Date(
            now.getFullYear(),
            now.getMonth(),
            0
        );

        days += lastMonth.getDate();
    }

    // Ajuste dos meses
    if (months < 0) {
        years--;
        months += 12;
    }

    // Tempo do dia
    const totalSeconds = Math.floor((now - startDate) / 1000);

    const seconds = totalSeconds % 60;
    const minutes = Math.floor(totalSeconds / 60) % 60;
    const hours = Math.floor(totalSeconds / 3600) % 24;

    document.getElementById("years").textContent = years;
    document.getElementById("months").textContent = months;
    document.getElementById("days").textContent = days;
    document.getElementById("hours").textContent = hours;
    document.getElementById("minutes").textContent = minutes;
    document.getElementById("seconds").textContent = seconds;
}

updateLoveCounter();
setInterval(updateLoveCounter, 1000);

});

/* ========================================
   COMO ADICIONAR NOVAS FOTOS:
   ========================================
   
   1. No arquivo index.html, encontre a seção "gallery-grid"
   
   2. Adicione um novo bloco assim:
   
      <div class="gallery-item" data-caption="Sua legenda romântica aqui">
          <img src="caminho/da/sua/foto.jpg" alt="Descrição">
      </div>
   
   3. Você pode usar:
      - Caminho relativo: "fotos/nossa-foto.jpg"
      - URL completa: "https://site.com/imagem.jpg"
   
   4. A legenda (data-caption) aparece no modal quando
      a foto é clicada
   
   5. O site suporta quantas fotos você quiser!
   
======================================== */
