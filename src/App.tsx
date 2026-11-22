import React, { useState, useMemo, useEffect } from 'react';
import {
  Calculator,
  DoorOpen,
  Ruler,
  Layers,
  Settings2,
  PaintRoller,
  CheckCircle2,
  PlusCircle,
  Hammer,
  ArrowRight,
  LayoutTemplate,
  PanelTop,
  X,
  Printer,
  FileText,
  Frame,
} from 'lucide-react';

export default function App() {
  // --- ÉTATS : DIMENSIONS ---
  const [H, setH] = useState(2068);
  const [L, setL] = useState(972);
  const [Ec, setEc] = useState(30);
  const [Lc, setLc] = useState(100);

  const [hasEmbrasure, setHasEmbrasure] = useState(false);
  const [Lembrasure, setLembrasure] = useState(150);

  const [hasImposte, setHasImposte] = useState(false);
  const [Himposte, setHimposte] = useState(400);
  const [imposteFaces, setImposteFaces] = useState(1);

  // --- ÉTATS : EMBRASURE ---
  const [embrasureMatiere, setEmbrasureMatiere] = useState('mdf_10');
  const [prixEmbrasureMatiereM2, setPrixEmbrasureMatiereM2] = useState(90);
  const [embrasureFinition, setEmbrasureFinition] = useState('cpl');
  const [prixEmbrasureFinitionM2, setPrixEmbrasureFinitionM2] = useState(40);
  const [prixEmbrasureColleM2, setPrixEmbrasureColleM2] = useState(10);
  const [prixEmbrasureVernisM2, setPrixEmbrasureVernisM2] = useState(75);

  // --- ÉTATS : IMPOSTE ---
  const [imposteMatiere, setImposteMatiere] = useState('mdf_10');
  const [prixImposteMatiereM2, setPrixImposteMatiereM2] = useState(90);
  const [imposteFinition, setImposteFinition] = useState('cpl');
  const [prixImposteFinitionM2, setPrixImposteFinitionM2] = useState(40);
  const [prixImposteColleM2, setPrixImposteColleM2] = useState(10);
  const [prixImposteVernisM2, setPrixImposteVernisM2] = useState(75);

  const [prixMatiereM3, setPrixMatiereM3] = useState(3800);

  // --- ÉTATS : STRUCTURE & MATÉRIAUX ---
  const [structure, setStructure] = useState('bb_35x33');
  const [ame, setAme] = useState('alveolaire');
  const [prixAmeM2, setPrixAmeM2] = useState(15);
  const [revetement, setRevetement] = useState('mdf_3');
  const [prixRevM2, setPrixRevM2] = useState(30);
  const [prixColleRev, setPrixColleRev] = useState(5);
  const [finition, setFinition] = useState('cpl');
  const [prixFinitionM2, setPrixFinitionM2] = useState(40);
  const [prixColleFin, setPrixColleFin] = useState(10);
  const [prixVernisM2, setPrixVernisM2] = useState(75);

  // --- ÉTATS : CADRE ---
  const [cadreMatiere, setCadreMatiere] = useState('boisDur');
  const [prixCadreMatiereM3, setPrixCadreMatiereM3] = useState(6000);
  const [cadreFinition, setCadreFinition] = useState('cpl');
  const [surfCadreFinitionM2, setSurfCadreFinitionM2] = useState(0);
  const [prixCadreFinitionM2, setPrixCadreFinitionM2] = useState(40);
  const [surfCadreColleM2, setSurfCadreColleM2] = useState(0);
  const [prixCadreColleM2, setPrixCadreColleM2] = useState(10);
  const [prixCadreVernisM2, setPrixCadreVernisM2] = useState(75);

  // --- ÉTATS : CHAMBRANLE ---
  const [chambranleType, setChambranleType] = useState('plat');
  const [chambranleMatiere, setChambranleMatiere] = useState('mdf_14');
  const [prixChambranleM2, setPrixChambranleM2] = useState(90);
  const [largeurMontantChambranle, setLargeurMontantChambranle] = useState(70);
  const [largeurTraverseChambranle, setLargeurTraverseChambranle] =
    useState(70);
  const [chambranleFinition, setChambranleFinition] = useState('cpl');
  const [prixChambranleFinitionM2, setPrixChambranleFinitionM2] = useState(40);
  const [prixChambranleColleM2, setPrixChambranleColleM2] = useState(10);
  const [prixChambranleVernisM2, setPrixChambranleVernisM2] = useState(75);

  // --- ÉTAT : MODAL DEVIS ---
  const [showDevisModal, setShowDevisModal] = useState(false);

  // --- CONSTANTES ET PRIX ---
  const prices = useMemo(
    () => ({
      sapinRouge: 3800,
      boisDur: 6000,
      boisLatte30: 5500,
      boisLatte40: 7000,
      boisHetre: 9500,
      cadreMatiere: {
        boisDur: { name: 'Bois dur', price: 6000 },
        sapinRouge: { name: 'Sapin rouge', price: 3800 },
        boisLatte30: { name: 'Bois latté 30 mm', price: 5500 },
        boisLatte40: { name: 'Bois latté 40 mm', price: 7000 },
        boisHetre: { name: 'Bois hêtre', price: 9500 },
      },
      ame: {
        alveolaire: { name: 'Alvéolaire', price: 15 },
        tubulaire: { name: 'Tubulaire', price: 85 },
        panneau_plein: { name: 'Panneau plein', price: 140 },
        cf_33: { name: 'Panneau plein CF 33 mm', price: 250 },
        streabord_cf_44: { name: 'Panneau Streabord CF 44 mm', price: 350 },
        streabord_54: { name: 'Streabord 54 mm', price: 450 },
      },
      revetement: {
        mdf_3: { name: 'MDF 3mm', price: 30, thick: 3 },
        mdf_5: { name: 'MDF 5mm', price: 45, thick: 5 },
        cp_3: { name: 'CP 3mm', price: 45, thick: 3 },
        cp_5: { name: 'CP 5mm', price: 65, thick: 5 },
      },
      embrasureMatiere: {
        mdf_10: { name: 'MDF 10 mm', price: 90 },
        cp_10: { name: 'CP 10 mm', price: 110 },
      },
      imposteMatiere: {
        mdf_10: { name: 'MDF 10 mm', price: 90 },
        mdf_18: { name: 'MDF 18 mm', price: 150 },
      },
      chambranleMatiere: {
        sapin_14: { name: 'Bois sapin 14 mm', price: 120 },
        boisDur_14: { name: 'Bois dur 14 mm', price: 250 },
        mdf_14: { name: 'MDF 14 mm', price: 90 },
        hetre_14: { name: 'Bois hêtre 14 mm', price: 180 },
        latte_15: { name: 'Latté 15 mm', price: 180 },
      },
      colleRev: 5,
      finition: {
        cpl: { name: 'CPL', price: 40 },
        melamine: { name: 'Mélaminé', price: 35 },
        placage: { name: 'Placage Bois', price: 120 },
      },
      colleFin: 10,
      vernis: 75,
    }),
    []
  );

  const structuresConfig = useMemo(
    () => ({
      bb_35x33: {
        name: 'Bois sapin rouge 35x33',
        w: 35,
        t: 33,
        price: prices.sapinRouge,
      },
      bd_54x25: { name: 'Bois dur 54x25', w: 25, t: 54, price: prices.boisDur },
      bd_44x25: { name: 'Bois dur 44x25', w: 25, t: 44, price: prices.boisDur },
    }),
    [prices]
  );

  const ameCompatibilities = useMemo(
    () => ({
      bb_35x33: ['alveolaire', 'tubulaire', 'panneau_plein', 'cf_33'],
      bd_54x25: ['streabord_54'],
      bd_44x25: ['streabord_cf_44'],
    }),
    []
  );

  // --- GESTIONNAIRES DE CHANGEMENT ---
  const handleStructureChange = (newStructKey) => {
    setStructure(newStructKey);
    setPrixMatiereM3(structuresConfig[newStructKey].price);
    const validAmes = ameCompatibilities[newStructKey];
    if (!validAmes.includes(ame)) {
      setAme(validAmes[0]);
      setPrixAmeM2(prices.ame[validAmes[0]].price);
    }
  };

  const handleAmeChange = (newAmeKey) => {
    setAme(newAmeKey);
    setPrixAmeM2(prices.ame[newAmeKey].price);
  };

  const handleRevetementChange = (newRevKey) => {
    setRevetement(newRevKey);
    setPrixRevM2(prices.revetement[newRevKey].price);
  };

  const handleFinitionChange = (newFinKey) => {
    setFinition(newFinKey);
    setPrixFinitionM2(prices.finition[newFinKey].price);
  };

  const handleEmbrasureMatiereChange = (newMatKey) => {
    setEmbrasureMatiere(newMatKey);
    setPrixEmbrasureMatiereM2(prices.embrasureMatiere[newMatKey].price);
  };

  const handleEmbrasureFinitionChange = (newFinKey) => {
    setEmbrasureFinition(newFinKey);
    setPrixEmbrasureFinitionM2(prices.finition[newFinKey].price);
  };

  const handleImposteMatiereChange = (newMatKey) => {
    setImposteMatiere(newMatKey);
    setPrixImposteMatiereM2(prices.imposteMatiere[newMatKey].price);
  };

  const handleImposteFinitionChange = (newFinKey) => {
    setImposteFinition(newFinKey);
    setPrixImposteFinitionM2(prices.finition[newFinKey].price);
  };

  const handleCadreMatiereChange = (newMatKey) => {
    setCadreMatiere(newMatKey);
    const priceMap = {
      boisDur: 6000,
      sapinRouge: 3800,
      boisLatte30: 5500,
      boisLatte40: 7000,
      boisHetre: 9500,
    };
    const p = priceMap[newMatKey] || 6000;
    setPrixCadreMatiereM3(p);
  };

  const handleCadreFinitionChange = (newFinKey) => {
    setCadreFinition(newFinKey);
    setPrixCadreFinitionM2(prices.finition[newFinKey].price);
  };

  const handleChambranleMatiereChange = (newMatKey) => {
    setChambranleMatiere(newMatKey);
    setPrixChambranleM2(prices.chambranleMatiere[newMatKey].price);
  };

  const handleChambranleFinitionChange = (newFinKey) => {
    setChambranleFinition(newFinKey);
    setPrixChambranleFinitionM2(prices.finition[newFinKey].price);
  };

  // --- CALCULS DES DIMENSIONS ---
  const Hv = useMemo(() => H - Ec + 11 - 2 - 7, [H, Ec]);
  const Lv = useMemo(() => L - 2 * Ec + 22 - 4, [L, Ec]);

  const currentStruct = structuresConfig[structure];
  const revConfig = prices.revetement[revetement];

  // Épaisseur totale du vantail = structure + (2 * revêtement) + (2 * 0.5 mm finition)
  const epaisseurTotaleVantail =
    currentStruct.t + 2 * revConfig.thick + 2 * 0.5;

  // --- CALCUL DU VOLUME DE LA STRUCTURE DU VANTAIL (en m3) ---
  const volStructureM3 = useMemo(() => {
    const volMontants = 2 * Hv * currentStruct.w * currentStruct.t;
    const lTraverse = Math.max(0, Lv - 2 * currentStruct.w);
    const volTraverses = 2 * lTraverse * currentStruct.w * currentStruct.t;
    return (volMontants + volTraverses) / 1000000000;
  }, [Hv, Lv, currentStruct]);

  const surfAmeM2 = useMemo(() => {
    return (
      (Math.max(0, Hv - 2 * currentStruct.w) *
        Math.max(0, Lv - 2 * currentStruct.w)) /
      1000000
    );
  }, [Hv, Lv, currentStruct]);

  // --- CALCULS DES SURFACES ET VOLUMES DU CADRE ---
  const cadreCalculs = useMemo(() => {
    const volCadre = ((2 * H + L) * Lc * Ec) / 1000000000;
    const largeurFinitionMm = Ec * 2 + 40 + 100;
    const surfMontantsM2 = (largeurFinitionMm * H * 2) / 1000000;
    const surfTraverseM2 = (largeurFinitionMm * L) / 1000000;
    const surfCadreFinitionM2Calculated = surfMontantsM2 + surfTraverseM2;

    return {
      vol: volCadre,
      surf: surfCadreFinitionM2Calculated,
    };
  }, [H, L, Ec, Lc]);

  // Mise à jour automatique des surfaces finition/colle du cadre lors d'un changement de dimensions
  useEffect(() => {
    setSurfCadreFinitionM2(Number(cadreCalculs.surf.toFixed(4)));
    setSurfCadreColleM2(Number(cadreCalculs.surf.toFixed(4)));
  }, [cadreCalculs.surf]);

  // --- CALCULS DES COÛTS ---
  const costs = useMemo(() => {
    const costCadreMatiere = cadreCalculs.vol * prixCadreMatiereM3;
    const costCadreFinitionMat = surfCadreFinitionM2 * prixCadreFinitionM2;
    const costCadreColle = surfCadreColleM2 * prixCadreColleM2;
    const costCadreVernis =
      cadreFinition === 'placage' ? surfCadreFinitionM2 * prixCadreVernisM2 : 0;
    const costCadre =
      costCadreMatiere +
      costCadreFinitionMat +
      costCadreColle +
      costCadreVernis;

    let costEmbrasure = 0;
    let surfEmbrasure = 0;
    if (hasEmbrasure) {
      surfEmbrasure = ((2 * H + L) * Lembrasure) / 1000000;
      const coutMatEmb = surfEmbrasure * prixEmbrasureMatiereM2;
      const coutFinEmb = surfEmbrasure * prixEmbrasureFinitionM2;
      const coutColleEmb = surfEmbrasure * prixEmbrasureColleM2;
      const coutVernisEmb =
        embrasureFinition === 'placage'
          ? surfEmbrasure * prixEmbrasureVernisM2
          : 0;
      costEmbrasure = coutMatEmb + coutFinEmb + coutColleEmb + coutVernisEmb;
    }

    const costStructure = volStructureM3 * prixMatiereM3;
    const costAme = surfAmeM2 * prixAmeM2;

    const surfVantail = (Hv * Lv) / 1000000;
    const surfVantail2Faces = surfVantail * 2;
    const costRevMatiere = surfVantail2Faces * prixRevM2;
    const costRevColle = surfVantail2Faces * prixColleRev;
    const costRevetement = costRevMatiere + costRevColle;

    // Calcul Chambranle
    const hMontantFace1 = hasImposte
      ? H + Himposte
      : H + largeurTraverseChambranle;
    const hMontantFace2 =
      hasImposte && imposteFaces === 2
        ? H + Himposte
        : H + largeurTraverseChambranle;

    const lTraverseFace1 = hasImposte ? Himposte : largeurTraverseChambranle;
    const lTraverseFace2 =
      hasImposte && imposteFaces === 2 ? Himposte : largeurTraverseChambranle;

    const surfChambranleFace1 =
      (2 * hMontantFace1 * largeurMontantChambranle + L * lTraverseFace1) /
      1000000;
    const surfChambranleFace2 =
      (2 * hMontantFace2 * largeurMontantChambranle + L * lTraverseFace2) /
      1000000;
    const surfChambranle = surfChambranleFace1 + surfChambranleFace2;

    const coutMatChambranle = surfChambranle * prixChambranleM2;
    const coutFinChambranle = surfChambranle * prixChambranleFinitionM2;
    const coutColleChambranle = surfChambranle * prixChambranleColleM2;
    const coutVernisChambranle =
      chambranleFinition === 'placage'
        ? surfChambranle * prixChambranleVernisM2
        : 0;
    const costChambranle =
      coutMatChambranle +
      coutFinChambranle +
      coutColleChambranle +
      coutVernisChambranle;

    const costFinMatiere = surfVantail2Faces * prixFinitionM2;
    const costFinColle = surfVantail2Faces * prixColleFin;
    const costVernis =
      finition === 'placage' ? surfVantail2Faces * prixVernisM2 : 0;
    const costFinition = costFinMatiere + costFinColle + costVernis;

    let costImposte = 0;
    let surfImposte = 0;
    if (hasImposte) {
      const volCadreImp = ((2 * Himposte + L) * Lc * Ec) / 1000000000;
      const coutCadreImp = volCadreImp * prices.boisDur;
      surfImposte = (Himposte * L) / 1000000;
      const coutMatiereImp = surfImposte * prixImposteMatiereM2;
      const coutFinImp = surfImposte * imposteFaces * prixImposteFinitionM2;
      const coutColleImp = surfImposte * imposteFaces * prixImposteColleM2;
      const coutVernisImp =
        imposteFinition === 'placage'
          ? surfImposte * imposteFaces * prixImposteVernisM2
          : 0;
      costImposte =
        coutCadreImp +
        coutMatiereImp +
        coutFinImp +
        coutColleImp +
        coutVernisImp;
    }

    const total =
      costCadre +
      costEmbrasure +
      costStructure +
      costAme +
      costRevetement +
      costFinition +
      costImposte +
      costChambranle;

    return {
      cadre: costCadre,
      embrasure: costEmbrasure,
      surfEmbrasure,
      chambranle: costChambranle,
      surfChambranle,
      structure: costStructure,
      ame: costAme,
      revetement: costRevetement,
      surfRevFinition: surfVantail2Faces,
      finition: costFinition,
      imposte: costImposte,
      surfImposte,
      total,
    };
  }, [
    H,
    L,
    Ec,
    Lc,
    hasEmbrasure,
    Lembrasure,
    embrasureFinition,
    prixEmbrasureMatiereM2,
    prixEmbrasureFinitionM2,
    prixEmbrasureColleM2,
    prixEmbrasureVernisM2,
    hasImposte,
    Himposte,
    imposteFaces,
    Hv,
    Lv,
    finition,
    prices,
    prixMatiereM3,
    volStructureM3,
    surfAmeM2,
    prixAmeM2,
    prixRevM2,
    prixColleRev,
    prixFinitionM2,
    prixColleFin,
    prixVernisM2,
    prixImposteMatiereM2,
    imposteFinition,
    prixImposteFinitionM2,
    prixImposteColleM2,
    prixImposteVernisM2,
    cadreCalculs,
    prixCadreMatiereM3,
    cadreFinition,
    surfCadreFinitionM2,
    prixCadreFinitionM2,
    surfCadreColleM2,
    prixCadreColleM2,
    prixCadreVernisM2,
    largeurMontantChambranle,
    largeurTraverseChambranle,
    prixChambranleM2,
    chambranleFinition,
    prixChambranleFinitionM2,
    prixChambranleColleM2,
    prixChambranleVernisM2,
  ]);

  const fmt = (val) =>
    new Intl.NumberFormat('fr-MA', {
      style: 'currency',
      currency: 'MAD',
      maximumFractionDigits: 2,
    }).format(val || 0);

  const fmtUnit = (val) =>
    new Intl.NumberFormat('fr-FR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 4,
    }).format(val || 0);

  const dateDuJour = new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(new Date());

  const inputClass =
    'w-full bg-stone-50 border border-stone-300 rounded-lg px-3.5 py-2 text-stone-800 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 focus:outline-none transition-all';
  const selectClass =
    'w-full bg-stone-50 border border-stone-300 rounded-lg px-3.5 py-2 text-stone-800 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 focus:outline-none transition-all cursor-pointer';

  return (
    <div className="min-h-screen bg-stone-100 font-sans text-stone-800 pb-16">
      {/* Styles dédiés à l'impression du devis */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #devis-printable, #devis-printable * {
            visibility: visible;
          }
          #devis-printable {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            box-shadow: none !important;
            border: none !important;
            margin: 0 !important;
            padding: 20px !important;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>

      {/* HEADER */}
      <header className="bg-stone-900 text-stone-50 py-5 px-4 sm:px-8 shadow-md">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative overflow-hidden px-5 py-4 bg-gradient-to-br from-amber-500 to-amber-700 rounded-xl shadow-[0_0_15px_rgba(245,158,11,0.3)] border border-amber-400/50 flex flex-col items-center justify-center transform hover:rotate-3 transition-transform leading-none gap-0.5 shrink-0">
              {/* Motif géométrique traditionnel zellige */}
              <div className="absolute inset-0 opacity-25 pointer-events-none">
                <svg
                  width="100%"
                  height="100%"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <pattern
                      id="zellige"
                      x="0"
                      y="0"
                      width="40"
                      height="40"
                      patternUnits="userSpaceOnUse"
                    >
                      <path
                        d="M20 0 L40 20 L20 40 L0 20 Z"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M0 0 L40 40 M40 0 L0 40"
                        stroke="currentColor"
                        strokeWidth="0.5"
                      />
                      <rect
                        x="10"
                        y="10"
                        width="20"
                        height="20"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        transform="rotate(45 20 20)"
                      />
                    </pattern>
                  </defs>
                  <rect
                    width="100%"
                    height="100%"
                    fill="url(#zellige)"
                    className="text-amber-900"
                  />
                </svg>
              </div>

              <span
                className="relative z-10 text-2xl sm:text-3xl font-black text-white tracking-tighter"
                style={{
                  textShadow:
                    '1px 1px 0 #92400e, 2px 2px 0 #78350f, 3px 3px 0 #451a03, 4px 4px 10px rgba(0,0,0,0.8)',
                }}
              >
                Z
              </span>
              <span
                className="relative z-10 text-2xl sm:text-3xl font-black text-white tracking-tighter"
                style={{
                  textShadow:
                    '1px 1px 0 #92400e, 2px 2px 0 #78350f, 3px 3px 0 #451a03, 4px 4px 10px rgba(0,0,0,0.8)',
                }}
              >
                Y
              </span>
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-wide text-white">
                Estima<span className="text-amber-500">ZY</span>
              </h1>
              <p className="text-stone-400 text-xs sm:text-sm mt-0.5">
                Outil d'estimation avancée pour blocs-portes sur mesure
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowDevisModal(true)}
            className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-4 py-2.5 rounded-lg font-medium transition-colors shadow-sm cursor-pointer shrink-0"
          >
            <FileText size={18} />
            <span className="hidden sm:inline">Voir le devis</span>
            <span className="sm:hidden">Devis</span>
          </button>
        </div>
      </header>

      {/* CONTENU PRINCIPAL */}
      <main className="max-w-6xl mx-auto mt-8 px-4 flex flex-col lg:flex-row gap-8 items-start">
        {/* COLONNE GAUCHE : CONFIGURATION */}
        <div className="flex-1 w-full space-y-6">
          {/* SECTION 1 : DIMENSIONS & CADRE */}
          <section className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden">
            <div className="bg-stone-50 px-6 py-4 border-b border-stone-200 flex items-center gap-3">
              <Ruler className="text-amber-600" size={22} />
              <h2 className="text-lg font-semibold text-stone-700">
                1. Dimensions & Cadre (mm)
              </h2>
            </div>

            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-stone-600 mb-1.5">
                  Hauteur totale (H)
                </label>
                <input
                  type="number"
                  value={H}
                  onChange={(e) => setH(Number(e.target.value))}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-600 mb-1.5">
                  Largeur totale (L)
                </label>
                <input
                  type="number"
                  value={L}
                  onChange={(e) => setL(Number(e.target.value))}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-600 mb-1.5">
                  Épaisseur du cadre (Ec)
                </label>
                <input
                  type="number"
                  value={Ec}
                  onChange={(e) => setEc(Number(e.target.value))}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-600 mb-1.5">
                  Largeur du cadre (Lc)
                </label>
                <input
                  type="number"
                  value={Lc}
                  onChange={(e) => setLc(Number(e.target.value))}
                  className={inputClass}
                />
              </div>
            </div>

            {/* SPÉCIFICATIONS DU CADRE */}
            <div className="px-6 py-5 bg-stone-50/60 border-t border-stone-200 space-y-5">
              <div className="flex items-center gap-2">
                <Frame className="text-amber-600" size={18} />
                <h3 className="text-sm font-bold uppercase tracking-wider text-stone-700">
                  Spécifications du Cadre
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-stone-600 mb-1.5">
                    Matière première du cadre
                  </label>
                  <select
                    value={cadreMatiere}
                    onChange={(e) => handleCadreMatiereChange(e.target.value)}
                    className={selectClass}
                  >
                    <option value="boisDur">Bois dur (6 000 MAD/m³)</option>
                    <option value="sapinRouge">
                      Sapin rouge (3 800 MAD/m³)
                    </option>
                    <option value="boisLatte30">
                      Bois latté 30 mm (5 500 MAD/m³)
                    </option>
                    <option value="boisLatte40">
                      Bois latté 40 mm (7 000 MAD/m³)
                    </option>
                    <option value="boisHetre">Bois hêtre (9 500 MAD/m³)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-600 mb-1.5">
                    Prix matière (MAD/m³)
                  </label>
                  <input
                    type="number"
                    value={prixCadreMatiereM3}
                    onChange={(e) =>
                      setPrixCadreMatiereM3(Number(e.target.value))
                    }
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-stone-600 mb-1.5">
                    Finition du cadre
                  </label>
                  <select
                    value={cadreFinition}
                    onChange={(e) => handleCadreFinitionChange(e.target.value)}
                    className={selectClass}
                  >
                    {Object.entries(prices.finition).map(([key, item]) => (
                      <option key={key} value={key}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-600 mb-1.5">
                    Surface finition (m²)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={surfCadreFinitionM2}
                    onChange={(e) =>
                      setSurfCadreFinitionM2(Number(e.target.value))
                    }
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-600 mb-1.5">
                    Prix finition (MAD/m²)
                  </label>
                  <input
                    type="number"
                    value={prixCadreFinitionM2}
                    onChange={(e) =>
                      setPrixCadreFinitionM2(Number(e.target.value))
                    }
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-stone-600 mb-1.5">
                    Surface colle (m²)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={surfCadreColleM2}
                    onChange={(e) =>
                      setSurfCadreColleM2(Number(e.target.value))
                    }
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-600 mb-1.5">
                    Prix colle (MAD/m²)
                  </label>
                  <input
                    type="number"
                    value={prixCadreColleM2}
                    onChange={(e) =>
                      setPrixCadreColleM2(Number(e.target.value))
                    }
                    className={inputClass}
                  />
                </div>
                {cadreFinition === 'placage' && (
                  <div>
                    <label className="block text-sm font-medium text-amber-700 mb-1.5">
                      Prix vernis (MAD/m²)
                    </label>
                    <input
                      type="number"
                      value={prixCadreVernisM2}
                      onChange={(e) =>
                        setPrixCadreVernisM2(Number(e.target.value))
                      }
                      className={`${inputClass} border-amber-300 bg-amber-50/40`}
                    />
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* SECTION 2 : OPTIONS COMPLÉMENTAIRES (EMBRASURE & IMPOSTE) */}
          <section className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden">
            <div className="bg-stone-50 px-6 py-4 border-b border-stone-200 flex items-center gap-3">
              <PlusCircle className="text-amber-600" size={22} />
              <h2 className="text-lg font-semibold text-stone-700">
                2. Options Complémentaires
              </h2>
            </div>

            <div className="p-6 space-y-6">
              {/* EMBRASURE */}
              <div className="border border-stone-200 rounded-xl p-4 bg-stone-50/40">
                <label className="flex items-center justify-between cursor-pointer select-none">
                  <div className="flex items-center gap-3">
                    <LayoutTemplate className="text-amber-600" size={20} />
                    <div>
                      <span className="font-semibold text-stone-800 block">
                        Ajouter une embrasure
                      </span>
                      <span className="text-xs text-stone-500">
                        Habillage de l'épaisseur du mur
                      </span>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={hasEmbrasure}
                    onChange={(e) => setHasEmbrasure(e.target.checked)}
                    className="w-5 h-5 accent-amber-600 rounded cursor-pointer"
                  />
                </label>

                {hasEmbrasure && (
                  <div className="mt-5 pt-5 border-t border-stone-200 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-stone-600 mb-1.5">
                          Largeur embrasure (mm)
                        </label>
                        <input
                          type="number"
                          value={Lembrasure}
                          onChange={(e) =>
                            setLembrasure(Number(e.target.value))
                          }
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-stone-600 mb-1.5">
                          Matière
                        </label>
                        <select
                          value={embrasureMatiere}
                          onChange={(e) =>
                            handleEmbrasureMatiereChange(e.target.value)
                          }
                          className={selectClass}
                        >
                          {Object.entries(prices.embrasureMatiere).map(
                            ([key, item]) => (
                              <option key={key} value={key}>
                                {item.name}
                              </option>
                            )
                          )}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-stone-600 mb-1.5">
                          Prix matière (MAD/m²)
                        </label>
                        <input
                          type="number"
                          value={prixEmbrasureMatiereM2}
                          onChange={(e) =>
                            setPrixEmbrasureMatiereM2(Number(e.target.value))
                          }
                          className={inputClass}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-stone-600 mb-1.5">
                          Finition
                        </label>
                        <select
                          value={embrasureFinition}
                          onChange={(e) =>
                            handleEmbrasureFinitionChange(e.target.value)
                          }
                          className={selectClass}
                        >
                          {Object.entries(prices.finition).map(
                            ([key, item]) => (
                              <option key={key} value={key}>
                                {item.name}
                              </option>
                            )
                          )}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-stone-600 mb-1.5">
                          Prix finition (MAD/m²)
                        </label>
                        <input
                          type="number"
                          value={prixEmbrasureFinitionM2}
                          onChange={(e) =>
                            setPrixEmbrasureFinitionM2(Number(e.target.value))
                          }
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-stone-600 mb-1.5">
                          Prix colle (MAD/m²)
                        </label>
                        <input
                          type="number"
                          value={prixEmbrasureColleM2}
                          onChange={(e) =>
                            setPrixEmbrasureColleM2(Number(e.target.value))
                          }
                          className={inputClass}
                        />
                      </div>
                    </div>

                    {embrasureFinition === 'placage' && (
                      <div className="sm:w-1/3">
                        <label className="block text-sm font-medium text-amber-700 mb-1.5">
                          Prix vernis (MAD/m²)
                        </label>
                        <input
                          type="number"
                          value={prixEmbrasureVernisM2}
                          onChange={(e) =>
                            setPrixEmbrasureVernisM2(Number(e.target.value))
                          }
                          className={`${inputClass} border-amber-300 bg-amber-50/40`}
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* IMPOSTE */}
              <div className="border border-stone-200 rounded-xl p-4 bg-stone-50/40">
                <label className="flex items-center justify-between cursor-pointer select-none">
                  <div className="flex items-center gap-3">
                    <PanelTop className="text-amber-600" size={20} />
                    <div>
                      <span className="font-semibold text-stone-800 block">
                        Ajouter une imposte
                      </span>
                      <span className="text-xs text-stone-500">
                        Panneau fixe supérieur au-dessus du vantail
                      </span>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={hasImposte}
                    onChange={(e) => setHasImposte(e.target.checked)}
                    className="w-5 h-5 accent-amber-600 rounded cursor-pointer"
                  />
                </label>

                {hasImposte && (
                  <div className="mt-5 pt-5 border-t border-stone-200 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-stone-600 mb-1.5">
                          Hauteur imposte (mm)
                        </label>
                        <input
                          type="number"
                          value={Himposte}
                          onChange={(e) => setHimposte(Number(e.target.value))}
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-stone-600 mb-1.5">
                          Nombre de faces finies
                        </label>
                        <select
                          value={imposteFaces}
                          onChange={(e) =>
                            setImposteFaces(Number(e.target.value))
                          }
                          className={selectClass}
                        >
                          <option value={1}>1 face</option>
                          <option value={2}>2 faces</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-stone-600 mb-1.5">
                          Matière imposte
                        </label>
                        <select
                          value={imposteMatiere}
                          onChange={(e) =>
                            handleImposteMatiereChange(e.target.value)
                          }
                          className={selectClass}
                        >
                          {Object.entries(prices.imposteMatiere).map(
                            ([key, item]) => (
                              <option key={key} value={key}>
                                {item.name}
                              </option>
                            )
                          )}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-stone-600 mb-1.5">
                          Prix matière (MAD/m²)
                        </label>
                        <input
                          type="number"
                          value={prixImposteMatiereM2}
                          onChange={(e) =>
                            setPrixImposteMatiereM2(Number(e.target.value))
                          }
                          className={inputClass}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-stone-600 mb-1.5">
                          Finition
                        </label>
                        <select
                          value={imposteFinition}
                          onChange={(e) =>
                            handleImposteFinitionChange(e.target.value)
                          }
                          className={selectClass}
                        >
                          {Object.entries(prices.finition).map(
                            ([key, item]) => (
                              <option key={key} value={key}>
                                {item.name}
                              </option>
                            )
                          )}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-stone-600 mb-1.5">
                          Prix finition (MAD/m²)
                        </label>
                        <input
                          type="number"
                          value={prixImposteFinitionM2}
                          onChange={(e) =>
                            setPrixImposteFinitionM2(Number(e.target.value))
                          }
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-stone-600 mb-1.5">
                          Prix colle (MAD/m²)
                        </label>
                        <input
                          type="number"
                          value={prixImposteColleM2}
                          onChange={(e) =>
                            setPrixImposteColleM2(Number(e.target.value))
                          }
                          className={inputClass}
                        />
                      </div>
                    </div>

                    {imposteFinition === 'placage' && (
                      <div className="sm:w-1/3">
                        <label className="block text-sm font-medium text-amber-700 mb-1.5">
                          Prix vernis (MAD/m²)
                        </label>
                        <input
                          type="number"
                          value={prixImposteVernisM2}
                          onChange={(e) =>
                            setPrixImposteVernisM2(Number(e.target.value))
                          }
                          className={`${inputClass} border-amber-300 bg-amber-50/40`}
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* SECTION 3 : STRUCTURE, ÂME, REVÊTEMENT & FINITION DU VANTAIL */}
          <section className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden">
            <div className="bg-stone-50 px-6 py-4 border-b border-stone-200 flex items-center gap-3">
              <Layers className="text-amber-600" size={22} />
              <h2 className="text-lg font-semibold text-stone-700">
                3. Structure, Âme, Revêtement & Finition du Vantail
              </h2>
            </div>

            <div className="p-6 space-y-6">
              {/* Structure */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-stone-600 mb-1.5">
                    Structure périphérique
                  </label>
                  <select
                    value={structure}
                    onChange={(e) => handleStructureChange(e.target.value)}
                    className={selectClass}
                  >
                    {Object.entries(structuresConfig).map(([key, item]) => (
                      <option key={key} value={key}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-600 mb-1.5">
                    Prix structure (MAD/m³)
                  </label>
                  <input
                    type="number"
                    value={prixMatiereM3}
                    onChange={(e) => setPrixMatiereM3(Number(e.target.value))}
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Âme */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-stone-100">
                <div>
                  <label className="block text-sm font-medium text-stone-600 mb-1.5">
                    Âme du vantail (compatible)
                  </label>
                  <select
                    value={ame}
                    onChange={(e) => handleAmeChange(e.target.value)}
                    className={selectClass}
                  >
                    {ameCompatibilities[structure].map((ameKey) => (
                      <option key={ameKey} value={ameKey}>
                        {prices.ame[ameKey].name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-600 mb-1.5">
                    Prix âme (MAD/m²)
                  </label>
                  <input
                    type="number"
                    value={prixAmeM2}
                    onChange={(e) => setPrixAmeM2(Number(e.target.value))}
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Revêtement */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-stone-100">
                <div>
                  <label className="block text-sm font-medium text-stone-600 mb-1.5">
                    Revêtement (2 faces)
                  </label>
                  <select
                    value={revetement}
                    onChange={(e) => handleRevetementChange(e.target.value)}
                    className={selectClass}
                  >
                    {Object.entries(prices.revetement).map(([key, item]) => (
                      <option key={key} value={key}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-600 mb-1.5">
                    Prix revêtement (MAD/m²)
                  </label>
                  <input
                    type="number"
                    value={prixRevM2}
                    onChange={(e) => setPrixRevM2(Number(e.target.value))}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-600 mb-1.5">
                    Prix colle rev. (MAD/m²)
                  </label>
                  <input
                    type="number"
                    value={prixColleRev}
                    onChange={(e) => setPrixColleRev(Number(e.target.value))}
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Finition */}
              <div className="pt-4 border-t border-stone-100 space-y-4">
                <div className="flex items-center gap-2 text-stone-700 font-medium text-sm">
                  <PaintRoller size={16} className="text-amber-600" />
                  <span>Finition du Vantail</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-stone-600 mb-1.5">
                      Type de finition
                    </label>
                    <select
                      value={finition}
                      onChange={(e) => handleFinitionChange(e.target.value)}
                      className={selectClass}
                    >
                      {Object.entries(prices.finition).map(([key, item]) => (
                        <option key={key} value={key}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-stone-600 mb-1.5">
                      Prix finition (MAD/m²)
                    </label>
                    <input
                      type="number"
                      value={prixFinitionM2}
                      onChange={(e) =>
                        setPrixFinitionM2(Number(e.target.value))
                      }
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-stone-600 mb-1.5">
                      Prix colle fin. (MAD/m²)
                    </label>
                    <input
                      type="number"
                      value={prixColleFin}
                      onChange={(e) => setPrixColleFin(Number(e.target.value))}
                      className={inputClass}
                    />
                  </div>
                </div>

                {finition === 'placage' && (
                  <div className="sm:w-1/3">
                    <label className="block text-sm font-medium text-amber-700 mb-1.5">
                      Prix vernis (MAD/m²)
                    </label>
                    <input
                      type="number"
                      value={prixVernisM2}
                      onChange={(e) => setPrixVernisM2(Number(e.target.value))}
                      className={`${inputClass} border-amber-300 bg-amber-50/40`}
                    />
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* SECTION 4 : CHAMBRANLE */}
          <section className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden">
            <div className="bg-stone-50 px-6 py-4 border-b border-stone-200 flex items-center gap-3">
              <Hammer className="text-amber-600" size={22} />
              <h2 className="text-lg font-semibold text-stone-700">
                4. Chambranle
              </h2>
            </div>

            <div className="p-6 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-stone-600 mb-1.5">
                    Type de chambranle
                  </label>
                  <select
                    value={chambranleType}
                    onChange={(e) => setChambranleType(e.target.value)}
                    className={selectClass}
                  >
                    <option value="plat">Plat</option>
                    <option value="moulure">Mouluré</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-600 mb-1.5">
                    Matière
                  </label>
                  <select
                    value={chambranleMatiere}
                    onChange={(e) =>
                      handleChambranleMatiereChange(e.target.value)
                    }
                    className={selectClass}
                  >
                    {Object.entries(prices.chambranleMatiere).map(
                      ([key, item]) => (
                        <option key={key} value={key}>
                          {item.name}
                        </option>
                      )
                    )}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-600 mb-1.5">
                    Prix matière (MAD/m²)
                  </label>
                  <input
                    type="number"
                    value={prixChambranleM2}
                    onChange={(e) =>
                      setPrixChambranleM2(Number(e.target.value))
                    }
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-stone-600 mb-1.5">
                    Largeur montant (mm)
                  </label>
                  <input
                    type="number"
                    value={largeurMontantChambranle}
                    onChange={(e) =>
                      setLargeurMontantChambranle(Number(e.target.value))
                    }
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-600 mb-1.5">
                    Largeur traverse (mm)
                  </label>
                  <input
                    type="number"
                    value={largeurTraverseChambranle}
                    onChange={(e) =>
                      setLargeurTraverseChambranle(Number(e.target.value))
                    }
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-stone-100">
                <div>
                  <label className="block text-sm font-medium text-stone-600 mb-1.5">
                    Finition
                  </label>
                  <select
                    value={chambranleFinition}
                    onChange={(e) =>
                      handleChambranleFinitionChange(e.target.value)
                    }
                    className={selectClass}
                  >
                    {Object.entries(prices.finition).map(([key, item]) => (
                      <option key={key} value={key}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-600 mb-1.5">
                    Prix finition (MAD/m²)
                  </label>
                  <input
                    type="number"
                    value={prixChambranleFinitionM2}
                    onChange={(e) =>
                      setPrixChambranleFinitionM2(Number(e.target.value))
                    }
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-600 mb-1.5">
                    Prix colle (MAD/m²)
                  </label>
                  <input
                    type="number"
                    value={prixChambranleColleM2}
                    onChange={(e) =>
                      setPrixChambranleColleM2(Number(e.target.value))
                    }
                    className={inputClass}
                  />
                </div>
              </div>

              {chambranleFinition === 'placage' && (
                <div className="sm:w-1/3">
                  <label className="block text-sm font-medium text-amber-700 mb-1.5">
                    Prix vernis (MAD/m²)
                  </label>
                  <input
                    type="number"
                    value={prixChambranleVernisM2}
                    onChange={(e) =>
                      setPrixChambranleVernisM2(Number(e.target.value))
                    }
                    className={`${inputClass} border-amber-300 bg-amber-50/40`}
                  />
                </div>
              )}
            </div>
          </section>
        </div>

        {/* COLONNE DROITE : RÉCAPITULATIF EN TEMPS RÉEL */}
        <aside className="w-full lg:w-96 lg:sticky lg:top-6 space-y-6">
          <div className="bg-white rounded-xl shadow-md border border-stone-200 overflow-hidden">
            <div className="bg-stone-900 text-white px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Calculator className="text-amber-500" size={20} />
                <h2 className="font-bold text-base tracking-wide">
                  Récapitulatif en temps réel
                </h2>
              </div>
              <DoorOpen className="text-stone-400" size={18} />
            </div>

            {/* Dimensions calculées du vantail */}
            <div className="p-5 bg-amber-50/60 border-b border-stone-200">
              <p className="text-xs font-bold uppercase tracking-wider text-amber-800 mb-3 flex items-center gap-1.5">
                <Settings2 size={14} /> Dimensions calculées du vantail
              </p>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="bg-white rounded-lg p-2.5 border border-amber-200/80 shadow-xs">
                  <span className="block text-[11px] text-stone-500">
                    Hauteur (Hv)
                  </span>
                  <span className="font-bold text-stone-800 text-sm">
                    {Hv} mm
                  </span>
                </div>
                <div className="bg-white rounded-lg p-2.5 border border-amber-200/80 shadow-xs">
                  <span className="block text-[11px] text-stone-500">
                    Largeur (Lv)
                  </span>
                  <span className="font-bold text-stone-800 text-sm">
                    {Lv} mm
                  </span>
                </div>
                <div className="bg-white rounded-lg p-2.5 border border-amber-200/80 shadow-xs">
                  <span className="block text-[11px] text-stone-500">
                    Épaisseur
                  </span>
                  <span className="font-bold text-amber-700 text-sm">
                    {epaisseurTotaleVantail} mm
                  </span>
                </div>
              </div>
            </div>

            {/* Détail des coûts par poste */}
            <div className="p-5 space-y-3 text-sm">
              <div className="flex justify-between items-start pb-2.5 border-b border-stone-100">
                <div>
                  <p className="font-medium text-stone-800">Cadre</p>
                  <p className="text-xs text-stone-500">
                    Vol: {fmtUnit(cadreCalculs.vol)} m³ • Fin:{' '}
                    {fmtUnit(surfCadreFinitionM2)} m²
                  </p>
                </div>
                <span className="font-semibold text-stone-800">
                  {fmt(costs.cadre)}
                </span>
              </div>

              {hasEmbrasure && (
                <div className="flex justify-between items-start pb-2.5 border-b border-stone-100">
                  <div>
                    <p className="font-medium text-stone-800">Embrasure</p>
                    <p className="text-xs text-stone-500">
                      Surf: {fmtUnit(costs.surfEmbrasure)} m²
                    </p>
                  </div>
                  <span className="font-semibold text-stone-800">
                    {fmt(costs.embrasure)}
                  </span>
                </div>
              )}

              {hasImposte && (
                <div className="flex justify-between items-start pb-2.5 border-b border-stone-100">
                  <div>
                    <p className="font-medium text-stone-800">
                      Imposte ({imposteFaces} face{imposteFaces > 1 ? 's' : ''})
                    </p>
                    <p className="text-xs text-stone-500">
                      Surf: {fmtUnit(costs.surfImposte)} m²
                    </p>
                  </div>
                  <span className="font-semibold text-stone-800">
                    {fmt(costs.imposte)}
                  </span>
                </div>
              )}

              <div className="flex justify-between items-start pb-2.5 border-b border-stone-100">
                <div>
                  <p className="font-medium text-stone-800">
                    Structure vantail
                  </p>
                  <p className="text-xs text-stone-500">
                    Vol: {fmtUnit(volStructureM3)} m³
                  </p>
                </div>
                <span className="font-semibold text-stone-800">
                  {fmt(costs.structure)}
                </span>
              </div>

              <div className="flex justify-between items-start pb-2.5 border-b border-stone-100">
                <div>
                  <p className="font-medium text-stone-800">
                    Âme ({prices.ame[ame]?.name})
                  </p>
                  <p className="text-xs text-stone-500">
                    Surf: {fmtUnit(surfAmeM2)} m²
                  </p>
                </div>
                <span className="font-semibold text-stone-800">
                  {fmt(costs.ame)}
                </span>
              </div>

              <div className="flex justify-between items-start pb-2.5 border-b border-stone-100">
                <div>
                  <p className="font-medium text-stone-800">
                    Revêtement ({revConfig.name})
                  </p>
                  <p className="text-xs text-stone-500">
                    Surf 2 faces: {fmtUnit(costs.surfRevFinition)} m²
                  </p>
                </div>
                <span className="font-semibold text-stone-800">
                  {fmt(costs.revetement)}
                </span>
              </div>

              <div className="flex justify-between items-start pb-2.5 border-b border-stone-100">
                <div>
                  <p className="font-medium text-stone-800">
                    Finition ({prices.finition[finition]?.name})
                  </p>
                  <p className="text-xs text-stone-500">
                    Surf 2 faces: {fmtUnit(costs.surfRevFinition)} m²
                  </p>
                </div>
                <span className="font-semibold text-stone-800">
                  {fmt(costs.finition)}
                </span>
              </div>

              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium text-stone-800">
                    Chambranle ({chambranleType === 'plat' ? 'Plat' : 'Mouluré'}
                    )
                  </p>
                  <p className="text-xs text-stone-500">
                    Surf: {fmtUnit(costs.surfChambranle)} m²
                  </p>
                </div>
                <span className="font-semibold text-stone-800">
                  {fmt(costs.chambranle)}
                </span>
              </div>
            </div>

            {/* Total estimé */}
            <div className="bg-stone-900 p-5 text-white">
              <div className="flex items-center justify-between mb-4">
                <span className="text-stone-300 text-sm font-medium uppercase tracking-wider">
                  Total Estimé HT
                </span>
                <span className="text-2xl font-black text-amber-400">
                  {fmt(costs.total)}
                </span>
              </div>
              <button
                onClick={() => setShowDevisModal(true)}
                className="w-full bg-amber-600 hover:bg-amber-500 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm cursor-pointer"
              >
                <FileText size={18} />
                <span>Générer le devis détaillé</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </aside>
      </main>

      {/* MODAL DEVIS */}
      {showDevisModal && (
        <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div
            id="devis-printable"
            className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-stone-200 overflow-hidden my-8"
          >
            {/* Barre d'actions modale */}
            <div className="no-print bg-stone-100 px-6 py-3.5 border-b border-stone-200 flex items-center justify-between">
              <span className="text-sm font-semibold text-stone-600 flex items-center gap-2">
                <CheckCircle2 size={16} className="text-amber-600" />
                Aperçu du devis estimatif
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="flex items-center gap-1.5 bg-stone-900 hover:bg-stone-800 text-white text-sm font-medium px-3.5 py-2 rounded-lg transition-colors cursor-pointer"
                >
                  <Printer size={16} />
                  Imprimer
                </button>
                <button
                  onClick={() => setShowDevisModal(false)}
                  className="p-2 text-stone-500 hover:text-stone-800 hover:bg-stone-200 rounded-lg transition-colors cursor-pointer"
                  aria-label="Fermer"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Contenu du devis */}
            <div className="p-6 sm:p-8 space-y-6">
              {/* En-tête Devis */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b-2 border-stone-900">
                <div>
                  <h2 className="text-3xl font-black tracking-wide text-stone-900">
                    Estima<span className="text-amber-600">ZY</span>
                  </h2>
                  <p className="text-sm text-stone-500">
                    Devis estimatif — Bloc-porte sur mesure
                  </p>
                </div>
                <div className="sm:text-right text-sm text-stone-600">
                  <p className="font-semibold text-stone-800">
                    Date : {dateDuJour}
                  </p>
                  <p>Devise : Dirham Marocain (MAD)</p>
                </div>
              </div>

              {/* Récapitulatif technique */}
              <div className="bg-stone-50 rounded-xl p-4 border border-stone-200 grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="block text-xs text-stone-500">
                    Dimensions totales
                  </span>
                  <span className="font-bold text-stone-800">
                    {H} × {L} mm
                  </span>
                </div>
                <div>
                  <span className="block text-xs text-stone-500">
                    Vantail (Hv × Lv)
                  </span>
                  <span className="font-bold text-stone-800">
                    {Hv} × {Lv} mm
                  </span>
                </div>
                <div>
                  <span className="block text-xs text-stone-500">
                    Épaisseur vantail
                  </span>
                  <span className="font-bold text-amber-700">
                    {epaisseurTotaleVantail} mm
                  </span>
                </div>
                <div>
                  <span className="block text-xs text-stone-500">
                    Cadre (Ec × Lc)
                  </span>
                  <span className="font-bold text-stone-800">
                    {Ec} × {Lc} mm
                  </span>
                </div>
              </div>

              {/* Tableau détaillé */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-stone-900 text-white text-left">
                      <th className="py-3 px-4 rounded-tl-lg font-semibold">
                        Poste & Spécifications
                      </th>
                      <th className="py-3 px-4 font-semibold text-right">
                        Quantité / Surface
                      </th>
                      <th className="py-3 px-4 rounded-tr-lg font-semibold text-right">
                        Montant (MAD)
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-200">
                    <tr>
                      <td className="py-3 px-4">
                        <p className="font-semibold text-stone-800">Cadre</p>
                        <p className="text-xs text-stone-500">
                          {prices.cadreMatiere[cadreMatiere]?.name} • Finition{' '}
                          {prices.finition[cadreFinition]?.name}
                        </p>
                      </td>
                      <td className="py-3 px-4 text-right text-stone-600">
                        {fmtUnit(cadreCalculs.vol)} m³ /{' '}
                        {fmtUnit(surfCadreFinitionM2)} m²
                      </td>
                      <td className="py-3 px-4 text-right font-semibold text-stone-800">
                        {fmt(costs.cadre)}
                      </td>
                    </tr>

                    {hasEmbrasure && (
                      <tr>
                        <td className="py-3 px-4">
                          <p className="font-semibold text-stone-800">
                            Embrasure ({Lembrasure} mm)
                          </p>
                          <p className="text-xs text-stone-500">
                            {prices.embrasureMatiere[embrasureMatiere]?.name} •
                            Finition {prices.finition[embrasureFinition]?.name}
                          </p>
                        </td>
                        <td className="py-3 px-4 text-right text-stone-600">
                          {fmtUnit(costs.surfEmbrasure)} m²
                        </td>
                        <td className="py-3 px-4 text-right font-semibold text-stone-800">
                          {fmt(costs.embrasure)}
                        </td>
                      </tr>
                    )}

                    {hasImposte && (
                      <tr>
                        <td className="py-3 px-4">
                          <p className="font-semibold text-stone-800">
                            Imposte (H: {Himposte} mm • {imposteFaces} face
                            {imposteFaces > 1 ? 's' : ''})
                          </p>
                          <p className="text-xs text-stone-500">
                            {prices.imposteMatiere[imposteMatiere]?.name} •
                            Finition {prices.finition[imposteFinition]?.name}
                          </p>
                        </td>
                        <td className="py-3 px-4 text-right text-stone-600">
                          {fmtUnit(costs.surfImposte)} m²
                        </td>
                        <td className="py-3 px-4 text-right font-semibold text-stone-800">
                          {fmt(costs.imposte)}
                        </td>
                      </tr>
                    )}

                    <tr>
                      <td className="py-3 px-4">
                        <p className="font-semibold text-stone-800">
                          Structure du vantail
                        </p>
                        <p className="text-xs text-stone-500">
                          {currentStruct.name}
                        </p>
                      </td>
                      <td className="py-3 px-4 text-right text-stone-600">
                        {fmtUnit(volStructureM3)} m³
                      </td>
                      <td className="py-3 px-4 text-right font-semibold text-stone-800">
                        {fmt(costs.structure)}
                      </td>
                    </tr>

                    <tr>
                      <td className="py-3 px-4">
                        <p className="font-semibold text-stone-800">
                          Âme du vantail
                        </p>
                        <p className="text-xs text-stone-500">
                          {prices.ame[ame]?.name}
                        </p>
                      </td>
                      <td className="py-3 px-4 text-right text-stone-600">
                        {fmtUnit(surfAmeM2)} m²
                      </td>
                      <td className="py-3 px-4 text-right font-semibold text-stone-800">
                        {fmt(costs.ame)}
                      </td>
                    </tr>

                    <tr>
                      <td className="py-3 px-4">
                        <p className="font-semibold text-stone-800">
                          Revêtement (2 faces + colle)
                        </p>
                        <p className="text-xs text-stone-500">
                          {revConfig.name}
                        </p>
                      </td>
                      <td className="py-3 px-4 text-right text-stone-600">
                        {fmtUnit(costs.surfRevFinition)} m²
                      </td>
                      <td className="py-3 px-4 text-right font-semibold text-stone-800">
                        {fmt(costs.revetement)}
                      </td>
                    </tr>

                    <tr>
                      <td className="py-3 px-4">
                        <p className="font-semibold text-stone-800">
                          Finition du vantail (2 faces)
                        </p>
                        <p className="text-xs text-stone-500">
                          {prices.finition[finition]?.name}
                          {finition === 'placage' ? ' + Vernis' : ''}
                        </p>
                      </td>
                      <td className="py-3 px-4 text-right text-stone-600">
                        {fmtUnit(costs.surfRevFinition)} m²
                      </td>
                      <td className="py-3 px-4 text-right font-semibold text-stone-800">
                        {fmt(costs.finition)}
                      </td>
                    </tr>

                    <tr>
                      <td className="py-3 px-4">
                        <p className="font-semibold text-stone-800">
                          Chambranle (
                          {chambranleType === 'plat' ? 'Plat' : 'Mouluré'})
                        </p>
                        <p className="text-xs text-stone-500">
                          {prices.chambranleMatiere[chambranleMatiere]?.name} •
                          Finition {prices.finition[chambranleFinition]?.name} •
                          Montant {largeurMontantChambranle}mm / Traverse{' '}
                          {largeurTraverseChambranle}mm
                        </p>
                      </td>
                      <td className="py-3 px-4 text-right text-stone-600">
                        {fmtUnit(costs.surfChambranle)} m²
                      </td>
                      <td className="py-3 px-4 text-right font-semibold text-stone-800">
                        {fmt(costs.chambranle)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Total Général */}
              <div className="flex justify-end pt-4 border-t-2 border-stone-900">
                <div className="bg-stone-900 text-white px-6 py-4 rounded-xl flex items-center gap-6">
                  <span className="text-sm uppercase tracking-wider text-stone-300 font-semibold">
                    Total Général Estimé
                  </span>
                  <span className="text-2xl font-black text-amber-400">
                    {fmt(costs.total)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
