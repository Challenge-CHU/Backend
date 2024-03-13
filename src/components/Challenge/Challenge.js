"use client";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import { Button } from "react-daisyui";
import StatsCard from "../Global/StatsCard";
import DownloadChallengeDatas from "./DownloadChallengeDatas";
import { useEffect, useState } from "react";
import ModalChallenge from "./ModalChallenge";
import GraphCard from "../Global/GraphCard";
import { getSession } from "next-auth/react";
import { getFetch } from "@/utils/fetch";

const Challenge = ({ challenges }) => {
    const [challenge, setChallenge] = useState(null);
    const [challengeStats, setChallengeStats] = useState(null);
    const [graphWeeks, setGraphWeeks] = useState([]);
    const [graphSteps, setGraphSteps] = useState([]);
    const [maxSteps, setMaxSteps] = useState(0);
    const [stepSize, setStepSize] = useState(0);

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
                setChallenge(runningChallenge);
            }
        }
    }, [challenges]);

    const getChallengeStats = async (challenge) => {
        try {
            const session = await getSession();
            const token = session ? session.user.jwt : null;
            const response = await getFetch(
                "/api/challenges/" + challenge.id + "/stats",
                token
            );
            if (!response.ok) {
                throw new Error("Failed to fetch challenge stats");
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    useEffect(() => {
        if (challenge) {
            const fetchData = async () => {
                const challengeStatsDatas = await getChallengeStats(challenge);
                setChallengeStats(challengeStatsDatas.data);
                setGraphWeeks(
                    challengeStatsDatas.data.challengesWeeks.map((week) => {
                        return "S" + week.week;
                    })
                );
                setGraphSteps(
                    challengeStatsDatas.data.challengesWeeks.map((week) => {
                        return week.weekSteps;
                    })
                );

                let max = Math.max(
                    ...challengeStatsDatas.data.challengesWeeks.map(
                        (week) => week.weekSteps
                    )
                );
                if (max > 10000 && max < 1000000) {
                    console.log("max");
                    max = max / 10000;
                    max = Math.round(max * 1.4) * 10000;
                } else if (max >= 1000000) {
                    console.log("max2");
                    max = max / 100000;
                    max = Math.round(max * 1.4) * 100000;
                } else {
                    max = Math.round(max * 1.4);
                }

                setMaxSteps(max < 10000 ? 10000 : max);
                setStepSize(Math.round(max / 5));
            };

            fetchData();
        }
    }, [challenge]);

    useEffect(() => {}, [
        challengeStats,
        graphWeeks,
        graphSteps,
        maxSteps,
        challenge,
    ]);

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

    const formatNumber = (number) => {
        return new Intl.NumberFormat("fr-FR").format(number);
    };

    return (
        <>
            {challenge ? (
                <div className="container mx-auto px-2 md:px-6 xl:px-24">
                    <div className=" flex flex-row flex-wrap md:flex-nowrap justify-between items-center mb-5 bg-primary text-white gap-2 px-4 lg:px-6 py-4 rounded-lg shadow-custom">
                        <h1 className="lg:text-2xl font-bold text-center flex justify-center items-center gap-2  w-full md:w-auto">
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
                        className="anim-challenge grid grid-cols-2 gap-5"
                    >
                        <div className="col-span-2 lg:col-span-1 flex flex-col gap-5  h-fit">
                            <ModalChallenge challenge={challenge} />
                            <DownloadChallengeDatas challenge={challenge} />
                            <GraphCard
                                title="Total pas par semaine"
                                type="line"
                                datas={graphSteps}
                                max={maxSteps}
                                labels={graphWeeks}
                                stepSize={stepSize}
                            />
                        </div>
                        <div className="col-span-2 lg:col-span-1 grid columns-2-custom gap-5 h-fit">
                            <StatsCard
                                label="Marcheurs"
                                value={
                                    challengeStats
                                        ? formatNumber(
                                              challengeStats.numberOfUsers
                                          )
                                        : "-"
                                }
                            />
                            <StatsCard
                                label="Pas moyen par marcheur"
                                value={
                                    challengeStats
                                        ? formatNumber(
                                              challengeStats.averageStepsPerUser
                                          )
                                        : "-"
                                }
                            />
                            <StatsCard
                                label="Pas par marcheur par jour"
                                value={
                                    challengeStats
                                        ? formatNumber(
                                              challengeStats.averageStepsPerDayAndPerUser
                                          )
                                        : "-"
                                }
                            />
                            <StatsCard
                                label="Pas totaux"
                                value={
                                    challengeStats
                                        ? formatNumber(
                                              challengeStats.totalSteps
                                          )
                                        : "-"
                                }
                            />
                            {challengeStats &&
                            challengeStats.challengeIsRunning ? (
                                <>
                                    <StatsCard
                                        label="Pas aujourd'hui"
                                        value={
                                            challengeStats
                                                ? formatNumber(
                                                      challengeStats.todaySteps
                                                  )
                                                : "-"
                                        }
                                    />
                                    <StatsCard
                                        label="Pas les 7 derniers jours"
                                        value={
                                            challengeStats
                                                ? formatNumber(
                                                      challengeStats.last7daysSteps
                                                  )
                                                : "-"
                                        }
                                    />
                                </>
                            ) : null}
                        </div>
                    </section>
                </div>
            ) : (
                <div className="container mx-auto px-2 md:px-10 lg:px-24">
                    <div className="flex flex-col justify-center items-center mb-10 bg-white text-secondary px-0 lg:px-6 py-4 rounded-lg shadow-custom">
                        <h1 className="lg:text-2xl font-bold text-center">
                            Aucun challenge défini
                        </h1>
                        <p className="text-center text-black">
                            Définissez un nouveau challenge
                        </p>
                    </div>
                </div>
            )}
        </>
    );
};

export default Challenge;
