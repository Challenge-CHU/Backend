"use client";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import { Button } from "react-daisyui";
import StatsCard from "../Global/StatsCard";
// import DownloadUtilisateurDatas from "./DownloadUtilisateurDatas";
import { useEffect, useState } from "react";
import DownloadUtilisateurDatas from "./DownloadUtilisateurDatas";
import GraphCard from "../Global/GraphCard";

const Utilisateur = ({ user }) => {
    const [challenge, setChallenge] = useState(null);
    const { challenges } = user;

    useEffect(() => {
        if (challenges.length > 0) {
            const today = new Date();
            const runningChallenge = challenges.find((c) => {
                const startDate = new Date(c.start_date);
                const endDate = new Date(c.end_date);
                return today >= startDate && today <= endDate;
            });
            if (!runningChallenge) {
                let lastRunningChallenge = null;
                challenges.forEach((c) => {
                    const endDate = new Date(c.end_date);
                    if (
                        endDate <= today &&
                        (!lastRunningChallenge ||
                            endDate > new Date(lastRunningChallenge.end_date))
                    ) {
                        lastRunningChallenge = c;
                    }
                });
                setChallenge(lastRunningChallenge);
            } else {
                setChallenge(challenges[0]);
            }
        }
    }, [challenges]);

    useEffect(() => {}, [challenge]);

    const previousChallenge = () => {
        const index = challenges.indexOf(challenge);
        if (index > 0) {
            setChallenge(challenges[index - 1]);
        }
    };

    const nextChallenge = () => {
        const index = challenges.indexOf(challenge);
        if (index < challenges.length - 1) {
            setChallenge(challenges[index + 1]);
        }
    };

    const hasNextChallenge = () => {
        const index = challenges.indexOf(challenge);
        return index < challenges.length - 1;
    };
    const hasPreviousChallenge = () => {
        const index = challenges.indexOf(challenge);
        return index > 0;
    };

    return (
        <>
            {challenge ? (
                <div className="container mx-auto px-2 md:px-6 xl:px-24">
                    <div className=" flex flex-row flex-wrap md:flex-nowrap justify-between items-center mb-5 bg-white text-secondary gap-2 px-4 lg:px-6 py-4 rounded-lg shadow-custom">
                        <h1 className="lg:text-2xl font-bold text-center flex items-center gap-2">
                            {challenge.name} du{" "}
                            {new Date(challenge.start_date).toLocaleDateString(
                                "fr-FR",
                                {
                                    day: "2-digit",
                                    month: "2-digit",
                                    year: "numeric",
                                }
                            )}{" "}
                            au{" "}
                            {new Date(challenge.end_date).toLocaleDateString(
                                "fr-FR",
                                {
                                    day: "2-digit",
                                    month: "2-digit",
                                    year: "numeric",
                                }
                            )}
                        </h1>
                        {hasPreviousChallenge() ? (
                            <Button
                                aria-label="Challenge précédent"
                                className="btn btn-primary md:order-first"
                                onClick={() => previousChallenge()}
                            >
                                <FaArrowAltCircleLeft size={25} />
                                <span>Précédent</span>
                            </Button>
                        ) : (
                            <Button
                                className="btn btn-primary btn-disabled md:order-first"
                                tabIndex={-1}
                                role="button"
                                aria-disabled="true"
                                aria-label="Challenge précédent"
                            >
                                <FaArrowAltCircleLeft
                                    className="text-gray-200 "
                                    size={25}
                                />
                                <span className=" text-gray-200">
                                    Précédent
                                </span>
                            </Button>
                        )}
                        {hasNextChallenge() ? (
                            <Button
                                aria-label="Challenge suivant"
                                color="primary"
                                onClick={() => nextChallenge()}
                            >
                                <span>Suivant</span>
                                <FaArrowAltCircleRight size={25} />
                            </Button>
                        ) : (
                            <Button
                                className="btn btn-primary text-gray-200 btn-disabled"
                                tabIndex={-1}
                                role="button"
                                aria-disabled="true"
                                aria-label="Challenge suivant"
                            >
                                <span className=" text-gray-200">Suivant</span>
                                <FaArrowAltCircleRight
                                    className="text-gray-200 "
                                    size={25}
                                />
                            </Button>
                        )}
                    </div>

                    <section
                        key={challenge.id}
                        className="anim-challenge flex flex-col xl:flex-row gap-5"
                    >
                        <div className="w-full lg:basis-1/2 grid columns-2-custom gap-5">
                            <DownloadUtilisateurDatas
                                user={user}
                                challenge={challenge}
                            />
                            <StatsCard label="Pas moyen par jour" />
                            <GraphCard title="Pas par mois" />
                        </div>
                        <div className="w-full lg:basis-1/2 grid columns-2-custom gap-5">
                            <StatsCard label="Pas 7 derniers jours" />
                            <StatsCard label="Pas totaux" />
                            <GraphCard title="Pas par semaine" />
                        </div>
                    </section>
                </div>
            ) : (
                <div className="container mx-auto px-2 md:px-10 lg:px-24">
                    <div className="flex flex-col justify-center items-center mb-10 bg-white text-secondary px-0 lg:px-6 py-4 rounded-lg shadow-custom">
                        <h1 className="lg:text-2xl font-bold text-center">
                            Aucun challenge défini
                        </h1>
                    </div>
                </div>
            )}
        </>
    );
};

export default Utilisateur;
