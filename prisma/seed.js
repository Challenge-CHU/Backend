const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
    await prisma.badge.deleteMany();
    await prisma.badgeCategory.deleteMany();
    await prisma.badgeFamily.deleteMany();

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

    const badgeFamilySteps = await prisma.badgeFamily.create({
        data: {
            name: "Pas",
        },
    });

    const badgeFamilyYears = await prisma.badgeFamily.create({
        data: {
            name: "Années",
        },
    });

    const badgeFamilyEco = await prisma.badgeFamily.create({
        data: {
            name: "Écologie",
        },
    });

    const badgeFamilyStreak = await prisma.badgeFamily.create({
        data: {
            name: "Série",
        },
    });

    const badge100K = await prisma.badge.create({
        data: {
            name: "Badge 100K",
            description: `Marcher 100 000 pas.`,
            image: "/badges/100K.png",
            rank: 1,
            BadgeCategory: {
                connect: {
                    id: badgeCategoryBronze.id,
                },
            },
            BadgeFamily: {
                connect: {
                    id: badgeFamilySteps.id,
                },
            },
        },
    });

    const badge250K = await prisma.badge.create({
        data: {
            name: "Badge 250K",
            description: `Marcher 250 000 pas`,
            image: "/badges/250K.png",
            rank: 2,
            BadgeCategory: {
                connect: {
                    id: badgeCategorySilver.id,
                },
            },
            BadgeFamily: {
                connect: {
                    id: badgeFamilySteps.id,
                },
            },
        },
    });

    const badge500K = await prisma.badge.create({
        data: {
            name: "Badge 500K",
            rank: 3,
            description: `Marcher 500 000 pas`,
            image: "/badges/500K.png",
            BadgeCategory: {
                connect: {
                    id: badgeCategoryGold.id,
                },
            },
            BadgeFamily: {
                connect: {
                    id: badgeFamilySteps.id,
                },
            },
        },
    });

    const badge2M = await prisma.badge.create({
        data: {
            name: "Badge 2M",
            description: `Marcher 2 000 000 pas`,
            image: "/badges/2M.png",
            rank: 4,
            BadgeCategory: {
                connect: {
                    id: badgeCategoryRuby.id,
                },
            },
            BadgeFamily: {
                connect: {
                    id: badgeFamilySteps.id,
                },
            },
        },
    });

    const edition2024 = await prisma.badge.create({
        data: {
            name: "Édition 2024",
            description: `Participer à l'édition 2024.`,
            image: "/badges/2024.png",
            rank: 0,
            BadgeCategory: {
                connect: {
                    id: badgeCategorySpecial.id,
                },
            },
            BadgeFamily: {
                connect: {
                    id: badgeFamilyYears.id,
                },
            },
        },
    });

    const edition2025 = await prisma.badge.create({
        data: {
            name: "Édition 2025",
            description: `Participer à l'édition 2025.`,
            image: "/badges/2025.png",
            rank: 0,
            BadgeCategory: {
                connect: {
                    id: badgeCategorySpecial.id,
                },
            },
            BadgeFamily: {
                connect: {
                    id: badgeFamilyYears.id,
                },
            },
        },
    });

    const edition2026 = await prisma.badge.create({
        data: {
            name: "Édition 2026",
            description: `Participer à l'édition 2026.`,
            image: "/badges/2026.png",
            rank: 0,
            BadgeCategory: {
                connect: {
                    id: badgeCategorySpecial.id,
                },
            },
            BadgeFamily: {
                connect: {
                    id: badgeFamilyYears.id,
                },
            },
        },
    });

    const edition2027 = await prisma.badge.create({
        data: {
            name: "Édition 2027",
            description: `Participer à l'édition 2027.`,
            image: "/badges/2027.png",
            rank: 0,
            BadgeCategory: {
                connect: {
                    id: badgeCategorySpecial.id,
                },
            },
            BadgeFamily: {
                connect: {
                    id: badgeFamilyYears.id,
                },
            },
        },
    });

    const edition2028 = await prisma.badge.create({
        data: {
            name: "Édition 2028",
            description: `Participer à l'édition 2028.`,
            image: "/badges/2028.png",
            rank: 0,
            BadgeCategory: {
                connect: {
                    id: badgeCategorySpecial.id,
                },
            },
            BadgeFamily: {
                connect: {
                    id: badgeFamilyYears.id,
                },
            },
        },
    });

    const serie3jours = await prisma.badge.create({
        data: {
            name: "Série 3 jours",
            description: `Réussir à marcher 10 000 pas pendant 3 jours consécutifs.`,
            image: "/badges/3j.png",
            rank: 1,
            BadgeCategory: {
                connect: {
                    id: badgeCategoryBronze.id,
                },
            },
            BadgeFamily: {
                connect: {
                    id: badgeFamilyStreak.id,
                },
            },
        },
    });

    const serie7jours = await prisma.badge.create({
        data: {
            name: "Série 7 jours",
            description: `Réussir à marcher 10 000 pas pendant 7 jours consécutifs.`,
            image: "/badges/7j.png",
            rank: 2,
            BadgeCategory: {
                connect: {
                    id: badgeCategoryBronze.id,
                },
            },
            BadgeFamily: {
                connect: {
                    id: badgeFamilyStreak.id,
                },
            },
        },
    });

    const serie14jours = await prisma.badge.create({
        data: {
            name: "Série 14 jours",
            description: `Réussir à marcher 10 000 pas pendant 14 jours consécutifs.`,
            image: "/badges/14j.png",
            rank: 3,
            BadgeCategory: {
                connect: {
                    id: badgeCategorySilver.id,
                },
            },
            BadgeFamily: {
                connect: {
                    id: badgeFamilyStreak.id,
                },
            },
        },
    });

    const serie30jours = await prisma.badge.create({
        data: {
            name: "Série 30 jours",
            description: `Réussir à marcher 10 000 pas pendant 30 jours consécutifs.`,
            image: "/badges/30j.png",
            rank: 4,
            BadgeCategory: {
                connect: {
                    id: badgeCategorySilver.id,
                },
            },
            BadgeFamily: {
                connect: {
                    id: badgeFamilyStreak.id,
                },
            },
        },
    });

    const serie90jours = await prisma.badge.create({
        data: {
            name: "Série 90 jours",
            description: `Réussir à marcher 10 000 pas pendant 90 jours consécutifs.`,
            image: "/badges/90j.png",
            rank: 5,
            BadgeCategory: {
                connect: {
                    id: badgeCategoryGold.id,
                },
            },
            BadgeFamily: {
                connect: {
                    id: badgeFamilyStreak.id,
                },
            },
        },
    });

    const serie180jours = await prisma.badge.create({
        data: {
            name: "Série 180 jours",
            description: `Réussir à marcher 10 000 pas pendant 180 jours consécutifs.`,
            image: "/badges/180j.png",
            rank: 6,
            BadgeCategory: {
                connect: {
                    id: badgeCategoryRuby.id,
                },
            },
            BadgeFamily: {
                connect: {
                    id: badgeFamilyStreak.id,
                },
            },
        },
    });

    const ecoWalkerDebutant = await prisma.badge.create({
        data: {
            name: "Éco-Walker débutant",
            description: `Économiser 50 kg de CO2 grâce à vos choix de transport respectueux de l'environnement.`,
            image: "/badges/CO2%20B.png",
            rank: 1,
            BadgeCategory: {
                connect: {
                    id: badgeCategoryBronze.id,
                },
            },
            BadgeFamily: {
                connect: {
                    id: badgeFamilyEco.id,
                },
            },
        },
    });

    const ecoWalkerEngage = await prisma.badge.create({
        data: {
            name: "Éco-Walker engagé",
            description: `Économiser 100 kg de CO2 grâce à vos choix de transport respectueux de l'environnement.`,
            image: "/badges/CO2%20A.png",
            rank: 2,
            BadgeCategory: {
                connect: {
                    id: badgeCategorySilver.id,
                },
            },
            BadgeFamily: {
                connect: {
                    id: badgeFamilyEco.id,
                },
            },
        },
    });

    const ecoChampion = await prisma.badge.create({
        data: {
            name: "Éco-Champion",
            description: `Économiser 200 kg de CO2 grâce à vos choix de transport respectueux de l'environnement.`,
            image: "/badges/CO2%20C.png",
            rank: 3,
            BadgeCategory: {
                connect: {
                    id: badgeCategoryGold.id,
                },
            },
            BadgeFamily: {
                connect: {
                    id: badgeFamilyEco.id,
                },
            },
        },
    });


    console.log({ badgeCategoryBronze, badgeCategorySilver, badgeCategoryGold, badgeCategoryRuby, badgeCategorySpecial, badge100K, badge250K, badge500K, badge2M, edition2024, edition2025, edition2026, edition2027, edition2028, serie3jours, serie7jours, serie14jours, serie30jours, serie90jours, serie180jours, ecoWalkerDebutant, ecoWalkerEngage, ecoChampion, badgeFamilySteps, badgeFamilyYears, badgeFamilyEco, badgeFamilyStreak });
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
