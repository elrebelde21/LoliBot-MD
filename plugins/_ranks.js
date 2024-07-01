global.rpg = {
  emoticon(string) {
    string = string.toLowerCase()
    let emot = { 
      role: '🏅',
      level: '⬆️'
    }
    let results = Object.keys(emot).map(v => [v, new RegExp(v, 'gi')]).filter(v => v[1].test(string))
    if (!results.length) return ''
    else return emot[results[0][0]]
  }, 
  role(level) {
    level = parseInt(level)
    if (isNaN(level)) return { name: '', level: '' }
    // this code make config.js to be a more understandable code
    const role = [
      { name: 'NOVATO(A) V', level: 0 }, 
      { name: 'NOVATO(A) IV', level: 4 }, 
      { name: 'NOVATO(A) III', level: 8 }, 
      { name: 'NOVATO(A) II', level: 12 }, 
      { name: 'NOVATO(A) I', level: 16 },
      { name: 'APRENDIS V', level: 20 }, 
      { name: 'APRENDIS IV', level: 24 }, 
      { name: 'APRENDIS III', level: 28 }, 
      { name: 'APRENDIS II', level: 32 }, { name: 'APRENDIS I', level: 36 },
      { name: 'EXPLORADOR(A) V', level: 40 }, { name: 'EXPLORADOR(A) IV', level: 44 }, { name: 'EXPLORADOR(A) III', level: 48 }, { name: 'EXPLORADOR(A) II', level: 52 }, { name: 'EXPLORADOR(A) I', level: 56 },
      { name: 'MAESTRO(A) V', level: 60 }, { name: 'MAESTRO(A) IV', level: 64 }, { name: 'MAESTRO(A) III', level: 68 }, { name: 'MAESTRO(A) II', level: 72 }, { name: 'MAESTRO(A) I', level: 76 },
      { name: 'IRON V', level: 80 }, { name: 'IRON IV', level: 84 }, { name: 'IRON III', level: 88 }, { name: 'IRON II', level: 92 }, { name: 'IRON I', level: 96 },
      { name: 'PLATA V', level: 100 }, { name: 'PLATA IV', level: 104 }, { name: 'PLATA III', level: 108 }, { name: 'PLATA II', level: 112 }, { name: 'PLATA I', level: 116 },
      { name: 'PLATA V', level: 120 }, { name: 'PLATA IV', level: 124 }, { name: 'PLATA III', level: 128 }, { name: 'PLATA II', level: 132 }, { name: 'PLATA I', level: 136 },
      { name: 'ORO V', level: 140 }, { name: 'ORO IV', level: 144 }, { name: 'ORO III', level: 148 }, { name: 'ORO II', level: 152 }, { name: 'ORO I', level: 156 },
      { name: 'ORO V', level: 160 }, { name: 'ORO IV', level: 164 }, { name: 'ORO III', level: 168 }, { name: 'ORO II', level: 172 }, { name: 'ORO I', level: 176 },
      { name: 'Bard V', level: 180 }, { name: 'Bard IV', level: 184 }, { name: 'Bard III', level: 188 }, { name: 'Bard II', level: 192 }, { name: 'Bard I', level: 196 },
      { name: 'Necromancer V', level: 200 }, { name: 'Necromancer IV', level: 204 }, { name: 'Necromancer III', level: 208 }, { name: 'Necromancer II', level: 212 }, { name: 'Necromancer I', level: 216 },
      { name: 'Warlock V', level: 220 }, { name: 'Warlock IV', level: 224 }, { name: 'Warlock III', level: 228 }, { name: 'Warlock II', level: 232 }, { name: 'Warlock I', level: 236 },
      { name: 'Wizard V', level: 240 }, { name: 'Wizard IV', level: 244 }, { name: 'Wizard III', level: 248 }, { name: 'Wizard II', level: 252 }, { name: 'Wizard I', level: 256 },
      { name: 'Sage V', level: 260 }, { name: 'Sage IV', level: 264 }, { name: 'Sage III', level: 268 }, { name: 'Sage II', level: 272 }, { name: 'Sage I', level: 276 },
      { name: 'Priest V', level: 280 }, { name: 'Priest IV', level: 284 }, { name: 'Priest III', level: 288 }, { name: 'Priest II', level: 292 }, { name: 'Priest I', level: 296 },
      { name: 'Rogue V', level: 300 }, { name: 'Rogue IV', level: 304 }, { name: 'Rogue III', level: 308 }, { name: 'Rogue II', level: 312 }, { name: 'Rogue I', level: 316 },
      { name: 'Brawler V', level: 320 }, { name: 'Brawler IV', level: 324 }, { name: 'Brawler III', level: 328 }, { name: 'Brawler II', level: 332 }, { name: 'Brawler I', level: 336 },
      { name: 'Archer V', level: 340 }, { name: 'Archer IV', level: 344 }, { name: 'Archer III', level: 348 }, { name: 'Archer II', level: 352 }, { name: 'Archer I', level: 356 },
      { name: 'Sniper V', level: 360 }, { name: 'Sniper IV', level: 364 }, { name: 'Sniper III', level: 368 }, { name: 'Sniper II', level: 372 }, { name: 'Sniper I', level: 376 },
      { name: 'Ninja V', level: 380 }, { name: 'Ninja IV', level: 384 }, { name: 'Ninja III', level: 388 }, { name: 'Ninja II', level: 392 }, { name: 'Ninja I', level: 396 },
      { name: 'Samurai V', level: 400 }, { name: 'Samurai IV', level: 404 }, { name: 'Samurai III', level: 408 }, { name: 'Samurai II', level: 412 }, { name: 'Samurai I', level: 416 },
      { name: 'Berserker V', level: 420 }, { name: 'Berserker IV', level: 424 }, { name: 'Berserker III', level: 428 }, { name: 'Berserker II', level: 432 }, { name: 'Berserker I', level: 436 },
      { name: 'Legend V', level: 440 }, { name: 'Legend IV', level: 444 }, { name: 'Legend III', level: 448 }, { name: 'Legend II', level: 452 }, { name: 'Legend I', level: 456 },
      { name: 'Champion V', level: 460 }, { name: 'Champion IV', level: 464 }, { name: 'Champion III', level: 468 }, { name: 'Champion II', level: 472 }, { name: 'Champion I', level: 476 },
      { name: 'Grandmaster V', level: 480 }, { name: 'Grandmaster IV', level: 484 }, { name: 'Grandmaster III', level: 488 }, { name: 'Grandmaster II', level: 492 }, { name: 'Grandmaster I', level: 496 },
      { name: 'Elder V', level: 500 }, { name: 'Elder IV', level: 504 }, { name: 'Elder III', level: 508 }, { name: 'Elder II', level: 512 }, { name: 'Elder I', level: 516 },
      { name: 'Immortal V', level: 520 }, { name: 'Immortal IV', level: 524 }, { name: 'Immortal III', level: 528 }, { name: 'Immortal II', level: 532 }, { name: 'Immortal I', level: 536 },
      { name: 'Nephalem V', level: 540 }, { name: 'Nephalem IV', level: 544 }, { name: 'Nephalem III', level: 548 }, { name: 'Nephalem II', level: 552 }, { name: 'Nephalem I', level: 556 },
      { name: 'Eternal V', level: 560 }, { name: 'Eternal IV', level: 564 }, { name: 'Eternal III', level: 568 }, { name: 'Eternal II', level: 572 }, { name: 'Eternal I', level: 576 },
      { name: 'Neptune V', level: 580 }, { name: 'Neptune IV', level: 584 }, { name: 'Neptune III', level: 588 }, { name: 'Neptune II', level: 592 }, { name: 'Neptune I', level: 596 },
      { name: 'Pluto V', level: 600 }, { name: 'Pluto IV', level: 604 }, { name: 'Pluto III', level: 608 }, { name: 'Pluto II', level: 612 }, { name: 'Pluto I', level: 616 },
      { name: 'Eris V', level: 620 }, { name: 'Eris IV', level: 624 }, { name: 'Eris III', level: 628 }, { name: 'Eris II', level: 632 }, { name: 'Eris I', level: 636 },
      { name: 'Ascension V', level: 640 }, { name: 'Ascension IV', level: 644 }, { name: 'Ascension III', level: 648 }, { name: 'Ascension II', level: 652 }, { name: 'Ascension I', level: 656 },
      { name: 'Elysium V', level: 660 }, { name: 'Elysium IV', level: 664 }, { name: 'Elysium III', level: 668 }, { name: 'Elysium II', level: 672 }, { name: 'Elysium I', level: 676 },
      { name: 'Ether V', level: 680 }, { name: 'Ether IV', level: 684 }, { name: 'Ether III', level: 688 }, { name: 'Ether II', level: 692 }, { name: 'Ether I', level: 696 },
      { name: 'Gaea V', level: 700 }, { name: 'Gaea IV', level: 704 }, { name: 'Gaea III', level: 708 }, { name: 'Gaea II', level: 712 }, { name: 'Gaea I', level: 716 },
      { name: 'Hades V', level: 720 }, { name: 'Hades IV', level: 724 }, { name: 'Hades III', level: 728 }, { name: 'Hades II', level: 732 }, { name: 'Hades I', level: 736 },
      { name: 'DIAMANTE V', level: 740 }, { name: 'DIAMANTE IV', level: 744 }, { name: 'DIAMANTE III', level: 748 }, { name: 'DIAMANTE II', level: 752 }, { name: 'DIAMANTE I', level: 756 },
      { name: 'DIAMANTE V', level: 760 }, { name: 'DIAMANTE IV', level: 764 }, { name: 'DIAMANTE III', level: 768 }, { name: 'DIAMANTE II', level: 772 }, { name: 'DIAMANTE I', level: 776 },
      { name: 'PRO EN NOVABOT-MD V', level: 780 }, { name: 'PRO EN NOVABOT-MD IV', level: 784 }, { name: 'PRO EN NOVABOT-MD III', level: 788 }, { name: 'PRO EN NOVABOT-MD II', level: 792 }, { name: 'PRO EN NOVABOT-MD I', level: 796 },
      { name: 'PRO EN NOVABOT-MD V', level: 800 }, { name: 'PRO EN NOVABOT-MD IV', level: 804 }, { name: 'PRO EN NOVABOT-MD III', level: 808 }, { name: 'PRO EN NOVABOT-MD II', level: 812 }, { name: 'PRO EN NOVABOT-MD I', level: 816 },
      { name: 'SUPER PRO V', level: 820 }, { name: 'SUPER PRO IV', level: 824 }, { name: 'SUPER PRO III', level: 828 }, { name: 'SUPER PRO II', level: 832 }, { name: 'SUPER PRO I', level: 836 },
      { name: 'SUPER PRO V', level: 840 }, { name: 'SUPER PRO IV', level: 844 }, { name: 'SUPER PRO III', level: 848 }, { name: 'SUPER PRO II', level: 852 }, { name: 'SUPER PRO I', level: 856 },
      { name: 'LEGENDARIO(A)  V', level: 860 }, { name: 'LEGENDARIO(A)  IV', level: 864 }, { name: 'LEGENDARIO(A)  III', level: 868 }, { name: 'LEGENDARIO(A)  II', level: 872 }, { name: 'LEGENDARIO(A)  I', level: 876 },
      { name: 'Nova V', level: 880 }, { name: 'Nova IV', level: 884 }, { name: 'Nova III', level: 888 }, { name: 'Nova II', level: 892 }, { name: 'Nova I', level: 896 },
      { name: 'LEGENDARIO(A)  V', level: 900 }, { name: 'LEGENDARIO(A)  IV', level: 904 }, { name: 'LEGENDARIO(A)  III', level: 908 }, { name: 'LEGENDARIO(A)  II', level: 912 }, { name: 'LEGENDARIO(A)  I', level: 916 },
      { name: 'LEYENDA V', level: 920 }, { name: 'LEYENDA IV', level: 924 }, { name: 'LEYENDA III', level: 928 }, { name: 'LEYENDA II', level: 932 }, { name: 'LEYENDA I', level: 936 },
      { name: 'LEYENDA V', level: 940 }, { name: 'LEYENDA IV', level: 944 }, { name: 'LEYENDA III', level: 948 }, { name: 'LEYENDA II', level: 952 }, { name: 'LEYENDA I', level: 956 },
      { name: 'ESTELAR V', level: 960 }, { name: 'ESTELAR IV', level: 964 }, { name: 'ESTELAR III', level: 968 }, { name: 'ESTELAR II', level: 972 }, { name: 'ESTELAR I', level: 976 },
      { name: 'TOP ASTRAL V', level: 980 }, { name: 'TOP ASTRAL IV', level: 984 }, { name: 'TOP ASTRAL III', level: 988 }, { name: 'TOP ASTRAL II', level: 992 }, { name: 'TOP ASTRAL I', level: 996 },
      { name: 'ÉLITE GLOBAL V', level: 1000 }, { name: 'ÉLITE GLOBAL IV', level: 1004 }, { name: 'ÉLITE GLOBAL III', level: 1008 }, { name: 'ÉLITE GLOBAL II', level: 1012 }, { name: 'ÉLITE GLOBAL I', level: 1016 },
      { name: 'ÉLITE GLOBAL V', level: 1020 }, { name: 'ÉLITE GLOBAL IV', level: 1024 }, { name: 'ÉLITE GLOBAL III', level: 1028 }, { name: 'ÉLITE GLOBAL II', level: 1032 }, { name: 'ÉLITE GLOBAL I', level: 1036 },
      { name: 'ÉLITE GLOBAL  V', level: 1040 }, { name: 'ÉLITE GLOBAL  IV', level: 1044 }, { name: 'ÉLITE GLOBAL  III', level: 1048 }, { name: 'ÉLITE GLOBAL  II', level: 1052 }, { name: 'ÉLITE GLOBAL  I', level: 1056 },
      { name: 'ÉLITE GLOBAL  V', level: 1060 }, { name: 'ÉLITE GLOBAL  IV', level: 1064 }, { name: 'ÉLITE GLOBAL  III', level: 1068 }, { name: 'ÉLITE GLOBAL  II', level: 1072 }, { name: 'ÉLITE GLOBAL  I', level: 1076 },
    ]

    return role.reverse().find(role => level >= role.level)
  }
}
