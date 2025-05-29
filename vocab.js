document.addEventListener("DOMContentLoaded", () => {
  const vocab = [
    {
      word: "Nefarious",
      correct: "Wicked, villainous, or criminal",
      options: [
        "Attempting to avoid notice or attention",
        "To decrease in size, extent, or degree",
        "To soothe the anger or anxiety of someone",
        "Wicked, villainous, or criminal",
      ],
    },
    {
      word: "Gregarious",
      correct: "Fond of company; sociable",
      options: [
        "To soothe the anger or anxiety of someone",
        "Fond of company; sociable",
        "Attempting to avoid notice or attention",
        "A person who attacks cherished beliefs or institutions",
      ],
    },
    {
      word: "Vociferous",
      correct: "Vehement or clamorous",
      options: [
        "Representing the most perfect example of something",
        "Vehement or clamorous",
        "Affected by lethargy; sluggish and apathetic",
        "A feeling of fear about something that may happen",
      ],
    },
    {
      word: "Ephemeral",
      correct: "Lasting for a very short time",
      options: [
        "To formally give up a position or right",
        "To examine or inspect thoroughly",
        "A harsh, discordant mixture of sounds",
        "Lasting for a very short time",
      ],
    },
    {
      word: "Ubiquitous",
      correct: "Present, appearing, or found everywhere",
      options: [
        "To reduce in intensity or severity",
        "A person who is excessively modest or shy",
        "A tendency to choose or do something regularly",
        "Present, appearing, or found everywhere",
      ],
    },
    {
      word: "Sycophant",
      correct:
        "A person who acts obsequiously toward someone important to gain advantage",
      options: [
        "A state of confusion or disorder",
        "To make amends for wrongdoing",
        "A sudden and violent upheaval",
        "A person who acts obsequiously toward someone important to gain advantage",
      ],
    },
    {
      word: "Pragmatic",
      correct: "Dealing with things sensibly and realistically",
      options: [
        "To express strong disapproval",
        "Able to be heard",
        "To make something seem less important",
        "Dealing with things sensibly and realistically",
      ],
    },
    {
      word: "Esoteric",
      correct: "Intended for or understood by only a small group",
      options: [
        "To formally reprimand someone",
        "To make something unnecessary",
        "A person who is indifferent to pleasure or pain",
        "Intended for or understood by only a small group",
      ],
    },
    {
      word: "Auspicious",
      correct: "Conducive to success; favorable",
      options: [
        "To make something unclear or difficult to understand",
        "To formally renounce a belief",
        "A person who is excessively talkative",
        "Conducive to success; favorable",
      ],
    },
    {
      word: "Iconoclast",
      correct: "A person who attacks cherished beliefs or institutions",
      options: [
        "To soothe the anger or anxiety of someone",
        "To decrease in size, extent, or degree",
        "Attempting to avoid notice or attention",
        "A person who attacks cherished beliefs or institutions",
      ],
    },
    {
      word: "Lugubrious",
      correct: "Looking or sounding sad and dismal",
      options: [
        "To formally give up a position or right",
        "To examine or inspect thoroughly",
        "A harsh, discordant mixture of sounds",
        "Looking or sounding sad and dismal",
      ],
    },
    {
      word: "Obfuscate",
      correct:
        "To deliberately make something unclear or difficult to understand",
      options: [
        "To reduce in intensity or severity",
        "A person who is excessively modest or shy",
        "A tendency to choose or do something regularly",
        "To deliberately make something unclear or difficult to understand",
      ],
    },
    {
      word: "Quixotic",
      correct: "Extremely idealistic; unrealistic and impractical",
      options: [
        "A state of confusion or disorder",
        "To make amends for wrongdoing",
        "A sudden and violent upheaval",
        "Extremely idealistic; unrealistic and impractical",
      ],
    },
    {
      word: "Recalcitrant",
      correct: "Stubbornly refusing to obey authority",
      options: [
        "To express strong disapproval",
        "Able to be heard",
        "To make something seem less important",
        "Stubbornly refusing to obey authority",
      ],
    },
    {
      word: "Sanguine",
      correct: "Optimistic or positive, especially in a bad situation",
      options: [
        "To formally reprimand someone",
        "To make something unnecessary",
        "A person who is indifferent to pleasure or pain",
        "Optimistic or positive, especially in a bad situation",
      ],
    },
    {
      word: "Trepidation",
      correct: "A feeling of fear about something that may happen",
      options: [
        "To make something unclear or difficult to understand",
        "To formally renounce a belief",
        "A person who is excessively talkative",
        "A feeling of fear about something that may happen",
      ],
    },
    {
      word: "Venerable",
      correct:
        "Accorded a great deal of respect due to age, wisdom, or character",
      options: [
        "To soothe the anger or anxiety of someone",
        "To decrease in size, extent, or degree",
        "Attempting to avoid notice or attention",
        "Accorded a great deal of respect due to age, wisdom, or character",
      ],
    },
    {
      word: "Wistful",
      correct: "Having or showing a feeling of vague or regretful longing",
      options: [
        "To formally give up a position or right",
        "To examine or inspect thoroughly",
        "A harsh, discordant mixture of sounds",
        "Having or showing a feeling of vague or regretful longing",
      ],
    },
    {
      word: "Xenophobia",
      correct: "Dislike or prejudice against people from other countries",
      options: [
        "To reduce in intensity or severity",
        "A person who is excessively modest or shy",
        "A tendency to choose or do something regularly",
        "Dislike or prejudice against people from other countries",
      ],
    },
    {
      word: "Zealous",
      correct: "Having or showing zeal; fervent",
      options: [
        "A state of confusion or disorder",
        "To make amends for wrongdoing",
        "A sudden and violent upheaval",
        "Having or showing zeal; fervent",
      ],
    },
  ];

  let currentIndex = 0;
  let score = 0;
  let wrongStreak = 0;
  let totalAnswered = 0;
  let correctAnswers = 0;

  const wordEl = document.getElementById("word");
  const choicesEl = document.getElementById("choices");
  const feedbackEl = document.getElementById("feedback");
  const scoreEl = document.getElementById("score");
  const nextBtn = document.getElementById("nextBtn");
  const restartBtn = document.getElementById("restartBtn");
  const progressEl = document.getElementById("progress");
  const correctSound = document.getElementById("correctSound");
  const wrongSound = document.getElementById("wrongSound");

  // Theme toggle
  const themeSwitch = document.getElementById("themeSwitch");
  const currentTheme = localStorage.getItem("theme") || "light";

  if (currentTheme === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
    themeSwitch.checked = true;
  }

  themeSwitch.addEventListener("change", () => {
    if (themeSwitch.checked) {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
    }
  });

  function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
  }

  function updateProgress() {
    const progress = (currentIndex / vocab.length) * 100;
    progressEl.style.width = `${progress}%`;
  }

  function loadWord() {
    if (currentIndex >= vocab.length) {
      endGame("🎉 Congratulations! You completed all words!");
      return;
    }

    feedbackEl.textContent = "";
    nextBtn.style.display = "none";
    restartBtn.style.display = "none";
    choicesEl.innerHTML = "";

    const current = vocab[currentIndex];
    wordEl.textContent = current.word;
    updateProgress();

    const shuffled = shuffle([...current.options]);
    shuffled.forEach((option, index) => {
      const btn = document.createElement("button");
      btn.textContent = option;
      btn.style.animation = `fadeInCard 0.6s ease ${index * 0.1}s forwards`;
      btn.onclick = () => {
        totalAnswered++;
        Array.from(choicesEl.children).forEach((b) => {
          b.disabled = true;
          if (b.textContent === current.correct) {
            b.classList.add("correct");
          } else if (b === btn && b.textContent !== current.correct) {
            b.classList.add("wrong");
          }
        });

        if (option === current.correct) {
          feedbackEl.textContent = "✅ Correct!";
          score += 10;
          correctAnswers++;
          wrongStreak = 0;
          correctSound
            .play()
            .catch((err) => console.error("Audio playback failed:", err));
        } else {
          feedbackEl.textContent = `❌ Wrong! Correct: ${current.correct}`;
          wrongStreak++;
          wrongSound
            .play()
            .catch((err) => console.error("Audio playback failed:", err));
        }

        scoreEl.textContent = `Score: ${score}`;
        nextBtn.style.display = "inline-block";

        if (wrongStreak >= 3) {
          endGame("❌ Game Over – 3 wrong answers in a row.");
        }
      };
      choicesEl.appendChild(btn);
    });
  }

  nextBtn.onclick = () => {
    currentIndex++;
    if (wrongStreak < 3) {
      loadWord();
    }
  };

  restartBtn.onclick = () => {
    currentIndex = 0;
    score = 0;
    wrongStreak = 0;
    totalAnswered = 0;
    correctAnswers = 0;
    scoreEl.textContent = `Score: ${score}`;
    loadWord();
  };

  function endGame(message) {
    wordEl.textContent = message;
    choicesEl.innerHTML = "";
    nextBtn.style.display = "none";
    restartBtn.style.display = "inline-block";
    progressEl.style.width = "100%";

    const accuracy =
      totalAnswered > 0
        ? ((correctAnswers / totalAnswered) * 100).toFixed(1)
        : 0;

    feedbackEl.innerHTML = `
      <hr style="margin: 1rem 0; border-color: var(--shadow);">
      <strong>Game Report:</strong><br>
      ✅ Correct: ${correctAnswers}<br>
      ❌ Incorrect: ${totalAnswered - correctAnswers}<br>
      🎯 Accuracy: ${accuracy}%<br>
      🧠 Total Words Attempted: ${totalAnswered}<br>
      🌟 Final Score: ${score}
    `;
  }

  // Animate elements on load
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.animation = `fadeInCard 0.6s ease forwards`;
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  document
    .querySelectorAll(".container, .score, .feedback")
    .forEach((el) => observer.observe(el));

  // Ensure initial load
  try {
    loadWord();
  } catch (err) {
    console.error("Failed to load word:", err);
    wordEl.textContent = "Error loading game. Please refresh the page.";
  }
});

// Inject card animation styles
const style = document.createElement("style");
style.innerHTML = `
@keyframes fadeInCard {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}`;
document.head.appendChild(style);
