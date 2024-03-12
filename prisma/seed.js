const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
    await prisma.badge.deleteMany();
    await prisma.badgeCategory.deleteMany();
    
    const badgeCategoryBronze = await prisma.badgeCategory.create({
        data: {
            name: "Bronze",
        },
    });

    const badgeCategorySilver = await prisma.badgeCategory.create({
        data: {
            name: "Silver",
        },
    });

    const badgeCategoryGold = await prisma.badgeCategory.create({
        data: {
            name: "Gold",
        },
    });

    const badgeCategoryRuby = await prisma.badgeCategory.create({
        data: {
            name: "Ruby",
        },
    });

    const badgeCategorySpecial = await prisma.badgeCategory.create({
        data: {
            name: "Special",
        },
    });

    const badge100K = await prisma.badge.create({
        data: {
            name: "Badge 100K",
            description: `Bravo ! Vous avez franchi la barre des 100 000 pas ! Continuez sur votre lancée et défiez-vous chaque jour pour atteindre de nouveaux sommets.
            Félicitations ! Vous avez parcouru un demi-million de pas. Votre persévérance et votre engagement envers votre santé sont remarquables. Continuez à marcher avec détermination !`,
            image: "/badges/100K.png",
            BadgeCategory: {
                connect: {
                    id: badgeCategoryBronze.id,
                },
            },
        },
    });

    const badge250K = await prisma.badge.create({
        data: {
            name: "Badge 250K",
            description: `Vous êtes sur la bonne voie ! Avec 250 000 pas à votre actif, vous montrez une détermination impressionnante. Continuez à avancer vers vos objectifs de santé et de bien-être !`,
            image: "/badges/250K.png",
            BadgeCategory: {
                connect: {
                    id: badgeCategorySilver.id,
                },
            },
        },
    });

    const badge500K = await prisma.badge.create({
        data: {
            name: "Badge 500K",
            description: `Bravo ! Vous avez franchi la barre des 100 000 pas ! Continuez sur votre lancée et défiez-vous chaque jour pour atteindre de nouveaux sommets.
            Félicitations ! Vous avez parcouru un demi-million de pas. Votre persévérance et votre engagement envers votre santé sont remarquables. Continuez à marcher avec détermination !`,
            image: "/badges/500K.png",
            BadgeCategory: {
                connect: {
                    id: badgeCategoryGold.id,
                },
            },
        },
    });

    const badge2M = await prisma.badge.create({
        data: {
            name: "Badge 2M",
            description: `Incroyable ! Vous avez atteint la marque impressionnante de 2 millions de pas ! Votre dévouement envers une vie active et saine est inspirant pour nous tous. Continuez à avancer et à repousser vos limites !`,
            image: "/badges/2M.png",
            BadgeCategory: {
                connect: {
                    id: badgeCategoryRuby.id,
                },
            },
        },
    });

    const edition2024 = await prisma.badge.create({
        data: {
            name: "Édition 2024",
            description: `Félicitations ! Vous avez participé à l'édition 2024 avec succès.En reconnaissance de votre engagement, voici votre badge exclusif. Merci pour votre contribution précieuse !`,
            image: "/badges/2024.png",
            BadgeCategory: {
                connect: {
                    id: badgeCategorySpecial.id,
                },
            },
        },
    });

    const edition2025 = await prisma.badge.create({
        data: {
            name: "Édition 2025",
            description: `Félicitations ! Vous avez participé à l'édition 2025 avec succès.En reconnaissance de votre engagement, voici votre badge exclusif. Merci pour votre contribution précieuse !`,
            image: "/badges/2025.png",
            BadgeCategory: {
                connect: {
                    id: badgeCategorySpecial.id,
                },
            },
        },
    });

    const edition2026 = await prisma.badge.create({
        data: {
            name: "Édition 2026",
            description: `Félicitations ! Vous avez participé à l'édition 2026 avec succès.En reconnaissance de votre engagement, voici votre badge exclusif. Merci pour votre contribution précieuse !`,
            image: "/badges/2026.png",
            BadgeCategory: {
                connect: {
                    id: badgeCategorySpecial.id,
                },
            },
        },
    });

    const edition2027 = await prisma.badge.create({
        data: {
            name: "Édition 2027",
            description: `Félicitations ! Vous avez participé à l'édition 2027 avec succès.En reconnaissance de votre engagement, voici votre badge exclusif. Merci pour votre contribution précieuse !`,
            image: "/badges/2027.png",
            BadgeCategory: {
                connect: {
                    id: badgeCategorySpecial.id,
                },
            },
        },
    });

    const edition2028 = await prisma.badge.create({
        data: {
            name: "Édition 2028",
            description: `Félicitations ! Vous avez participé à l'édition 2028 avec succès.En reconnaissance de votre engagement, voici votre badge exclusif. Merci pour votre contribution précieuse !`,
            image: "/badges/2028.png",
            BadgeCategory: {
                connect: {
                    id: badgeCategorySpecial.id,
                },
            },
        },
    });

    const serie3jours = await prisma.badge.create({
        data: {
            name: "Série 3 jours",
            description: `Félicitations pour votre série de 3 jours à 10 000 pas ! Vous êtes sur la bonne voie pour atteindre vos objectifs de santé et de bien-être. Continuez à marcher vers une vie plus active !`,
            image: "/badges/3j.png",
            BadgeCategory: {
                connect: {
                    id: badgeCategoryBronze.id,
                },
            },
        },
    });

    const serie7jours = await prisma.badge.create({
        data: {
            name: "Série 7 jours",
            description: `Bravo ! Vous avez atteint une semaine complète à 10 000 pas par jour. Votre persévérance est admirable et votre détermination est inspirante. Continuez à faire de l'exercice et à vous sentir bien !`,
            image: "/badges/7j.png",
            BadgeCategory: {
                connect: {
                    id: badgeCategoryBronze.id,
                },
            },
        },
    });

    const serie14jours = await prisma.badge.create({
        data: {
            name: "Série 14 jours",
            description: `Excellent travail ! Vous avez réussi à maintenir une série impressionnante de 14 jours consécutifs à 10 000 pas. Votre engagement envers une vie saine est remarquable. Continuez sur cette lancée !`,
            image: "/badges/14j.png",
            BadgeCategory: {
                connect: {
                    id: badgeCategorySilver.id,
                },
            },
        },
    });

    const serie30jours = await prisma.badge.create({
        data: {
            name: "Série 30 jours",
            description: `Félicitations pour un mois entier à 10 000 pas par jour ! Votre engagement envers votre santé et votre bien-être est exemplaire. Continuez à marcher vers une meilleure santé et un meilleur bien-être !`,
            image: "/badges/30j.png",
            BadgeCategory: {
                connect: {
                    id: badgeCategorySilver.id,
                },
            },
        },
    });

    const serie90jours = await prisma.badge.create({
        data: {
            name: "Série 90 jours",
            description: `Bravo ! Vous avez maintenu une série impressionnante de 90 jours à 10 000 pas. Votre détermination et votre persévérance sont dignes d'admiration. Continuez à marcher vers vos objectifs avec confiance !`,
            image: "/badges/90j.png",
            BadgeCategory: {
                connect: {
                    id: badgeCategoryGold.id,
                },
            },
        },
    });

    const serie180jours = await prisma.badge.create({
        data: {
            name: "Série 180 jours",
            description: `Incroyable ! Vous avez atteint un demi-année à 10 000 pas par jour. Votre engagement envers un mode de vie actif et sain est exemplaire. Continuez à marcher avec détermination et à inspirer les autres !`,
            image: "/badges/180j.png",
            BadgeCategory: {
                connect: {
                    id: badgeCategoryRuby.id,
                },
            },
        },
    });

    const ecoWalkerDebutant = await prisma.badge.create({
        data: {
            name: "Éco-Walker débutant",
            description: `Félicitations ! En tant que "Éco-walker débutant", vous avez réalisé des économies de CO2 estimées à 50 kg en optant pour des modes de transport écologiques. Votre engagement en faveur de la réduction des émissions de carbone est un pas dans la bonne direction pour un avenir plus durable. Continuez à marcher pour la planète !`,
            image: "/badges/CO2%20B.png",
            BadgeCategory: {
                connect: {
                    id: badgeCategoryBronze.id,
                },
            },
        },
    });

    const ecoWalkerEngage = await prisma.badge.create({
        data: {
            name: "Éco-Walker engagé",
            description: `Bravo ! En tant que "Éco-walker  Engagé", vous avez maintenant économisé 100 kg de CO2 grâce à vos choix de transport respectueux de l'environnement. Votre détermination à réduire votre empreinte carbone est remarquable et inspire les autres à suivre votre exemple. Continuez à marcher avec conviction pour un avenir plus vert !`,
            image: "/badges/CO2%20A.png",
            BadgeCategory: {
                connect: {
                    id: badgeCategorySilver.id,
                },
            },
        },
    });

    const ecoChampion = await prisma.badge.create({
        data: {
            name: "Éco-Champion",
            description: `Félicitations, vous êtes désormais un "Pas pour la Planète" ! Avec des économies de CO2 estimées à 200 kg, vous êtes un véritable champion de la marche écologique. Votre engagement envers la réduction des émissions de carbone est une source d'inspiration pour nous tous. Continuez à marcher fièrement, car chaque pas compte dans la préservation de notre planète !`,
            image: "/badges/CO2%20C.png",
            BadgeCategory: {
                connect: {
                    id: badgeCategoryGold.id,
                },
            },
        },
    });


    console.log({ badgeCategoryBronze, badgeCategorySilver, badgeCategoryGold, badgeCategoryRuby, badgeCategorySpecial, badge100K, badge250K, badge500K, badge2M, edition2024, edition2025, edition2026, edition2027, edition2028, serie3jours, serie7jours, serie14jours, serie30jours, serie90jours, serie180jours, ecoWalkerDebutant, ecoWalkerEngage, ecoChampion });
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
