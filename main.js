// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Smooth scrolling for navigation links
  const navLinks = document.querySelectorAll('a[href^="#"]');
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Download button functionality
  const downloadButtons = document.querySelectorAll(".download-btn");
  const modal = document.getElementById("download-modal");
  const closeBtn = document.querySelector(".close");
  const gpuNameSpan = document.getElementById("gpu-name");
  const progressFill = document.querySelector(".progress-fill");
  const progressText = document.querySelector(".progress-text");
  const downloadStatus = document.querySelector(".download-status");

  const downloadMessages = [
    "Initializing quantum GPU transmission...",
    "Scanning PCIe slots...",
    "Allocating virtual memory buffer...",
    "Downloading GPU microcode...",
    "Transmitting CUDA cores...",
    "Installing ray tracing units...",
    "Configuring memory controllers...",
    "Optimizing shader pipelines...",
    "Calibrating cooling systems...",
    "Finalizing installation...",
    "GPU successfully downloaded!",
  ];

  downloadButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const gpuName = this.getAttribute("data-gpu");
      startDownload(gpuName);
    });
  });

  function startDownload(gpuName) {
    gpuNameSpan.textContent = gpuName;
    modal.style.display = "block";

    // Reset progress
    progressFill.style.width = "0%";
    progressText.textContent = "0%";
    downloadStatus.textContent = downloadMessages[0];

    // Simulate download progress
    let progress = 0;
    let messageIndex = 0;

    const progressInterval = setInterval(() => {
      progress += Math.random() * 15 + 5; // Random progress between 5-20%

      if (progress > 100) {
        progress = 100;
        clearInterval(progressInterval);

        setTimeout(() => {
          showCompletionMessage(gpuName);
        }, 1000);
      }

      progressFill.style.width = progress + "%";
      progressText.textContent = Math.round(progress) + "%";

      // Update status message based on progress
      const newMessageIndex = Math.floor(
        (progress / 100) * (downloadMessages.length - 1)
      );
      if (
        newMessageIndex !== messageIndex &&
        newMessageIndex < downloadMessages.length
      ) {
        messageIndex = newMessageIndex;
        downloadStatus.textContent = downloadMessages[messageIndex];
      }
    }, 200 + Math.random() * 300); // Random interval between 200-500ms
  }

  function showCompletionMessage(gpuName) {
    const modalContent = modal.querySelector(".modal-content");
    modalContent.innerHTML = `
            <span class="close">&times;</span>
            <div style="text-align: center; padding: 2rem;">
                <div style="font-size: 4rem; margin-bottom: 1rem;">🎉</div>
                <h2 style="color: #4ecdc4; margin-bottom: 1rem;">Download Complete!</h2>
                <p style="font-size: 1.2rem; margin-bottom: 1rem;">
                    Your <strong>${gpuName}</strong> has been successfully downloaded!
                </p>
                <p style="color: #666; margin-bottom: 2rem;">
                    Please restart your computer to complete the installation.
                    Your new GPU should appear in Device Manager after reboot.
                </p>
                <button onclick="location.reload()" style="
                    background: linear-gradient(45deg, #4ecdc4, #44a08d);
                    color: white;
                    border: none;
                    padding: 12px 25px;
                    border-radius: 25px;
                    font-weight: 600;
                    cursor: pointer;
                    font-size: 1rem;
                ">Download Another GPU</button>
            </div>
        `;

    // Re-attach close functionality
    const newCloseBtn = modalContent.querySelector(".close");
    newCloseBtn.addEventListener("click", closeModal);
  }

  function closeModal() {
    modal.style.display = "none";
  }

  // Close modal functionality
  closeBtn.addEventListener("click", closeModal);

  // Close modal when clicking outside
  window.addEventListener("click", function (event) {
    if (event.target === modal) {
      closeModal();
    }
  });

  // Add some fun hover effects to GPU cards
  const gpuCards = document.querySelectorAll(".gpu-card");
  gpuCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px) rotateY(5deg)";
    });

    card.addEventListener("mouseleave", function () {
      if (this.classList.contains("featured")) {
        this.style.transform = "scale(1.05) translateY(-5px)";
      } else {
        this.style.transform = "translateY(0) rotateY(0deg)";
      }
    });
  });

  // Add floating animation to hero section
  const heroTitle = document.querySelector(".hero-title");
  if (heroTitle) {
    let floatDirection = 1;
    setInterval(() => {
      const currentTransform = heroTitle.style.transform || "translateY(0px)";
      const currentY = parseFloat(
        currentTransform.match(/translateY\(([^)]+)px\)/) || [0, 0]
      )[1];

      if (currentY > 5) floatDirection = -1;
      if (currentY < -5) floatDirection = 1;

      heroTitle.style.transform = `translateY(${
        currentY + floatDirection * 0.5
      }px)`;
    }, 100);
  }

  // Add particle effect to background (simple version)
  function createParticle() {
    const particle = document.createElement("div");
    particle.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: rgba(255, 255, 255, 0.6);
            border-radius: 50%;
            pointer-events: none;
            z-index: -1;
            left: ${Math.random() * 100}vw;
            top: 100vh;
            animation: float-up 8s linear forwards;
        `;

    document.body.appendChild(particle);

    setTimeout(() => {
      particle.remove();
    }, 8000);
  }

  // Add particle animation CSS
  const style = document.createElement("style");
  style.textContent = `
        @keyframes float-up {
            to {
                transform: translateY(-100vh) rotate(360deg);
                opacity: 0;
            }
        }
    `;
  document.head.appendChild(style);

  // Create particles periodically
  setInterval(createParticle, 500);

  // Add console easter egg
  console.log(`
    ╔══════════════════════════════════════╗
    ║        DOWNLOAD BETTER GPU           ║
    ║                                      ║
    ║   🚀 Quantum GPU Transmission API    ║
    ║      Successfully Initialized!       ║
    ║                                      ║
    ║   Warning: This is a parody site     ║
    ║   You cannot actually download       ║
    ║   physical hardware! 😄              ║
    ╚══════════════════════════════════════╝
    
    Fun fact: You're more likely to download a GPU
    than to find one in stock at MSRP! 😅
    `);
});
