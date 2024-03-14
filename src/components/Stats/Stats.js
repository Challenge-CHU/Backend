"use client";
import StatsCard from "../Global/StatsCard";
import GraphCard from "../Global/GraphCard";

const Statistiques = ({ challengesStats, numberOfUsers }) => {
    console.log(challengesStats);

    const graphNumberOfUsers = challengesStats.map((challenge) => {
        console.log(challenge);
        return challenge.numberOfUsers;
    });
    const graphNumberOfUsersLabels = challengesStats.map((challenge) => {
        return challenge.challenge.name;
    });

    const graphTotalSteps = challengesStats.map((challenge) => {
        console.log(challenge);
        return challenge.totalSteps;
    });
    const graphTotalStepsLabels = challengesStats.map((challenge) => {
        return challenge.challenge.name;
    });

    const getMaxAndStepSize = (array) => {
        console.log(array);
        let max = 0;
        let stepSize = 0;

        max = Math.max(...array);

        if (max <= 10000) {
            max = Math.round(max * 1.4);
        } else if (max > 10000 && max < 1000000) {
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

        stepSize = Math.round(max / 3);

        console.log([max, stepSize]);
        return [max, stepSize];
    };

    console.log(graphNumberOfUsers);
    console.log(graphNumberOfUsersLabels);
    console.log(graphTotalSteps);
    console.log(graphTotalStepsLabels);

    return (
        <>
            {challengesStats.length > 0 ? (
                <div className="container mx-auto px-2 md:px-6 xl:px-24">
                    <section
                        key={challengesStats[0].challenge.id}
                        className="anim-challenge flex flex-col lg:flex-row gap-5"
                    >
                        <div className="lg:basis-1/2 grid columns-2-custom gap-5">
                            <StatsCard
                                label="Utilisateurs inscrits"
                                value={numberOfUsers}
                            />
                            <StatsCard
                                label="Challenges"
                                value={challengesStats.length}
                            />
                            <GraphCard
                                title="Nombre de pas par challenge"
                                type="bar"
                                datas={
                                    graphTotalSteps.length > 0
                                        ? graphTotalSteps
                                        : [0]
                                }
                                labels={
                                    graphTotalStepsLabels.length > 0
                                        ? graphTotalStepsLabels
                                        : [""]
                                }
                                max={getMaxAndStepSize(graphTotalSteps)[0]}
                                stepSize={getMaxAndStepSize(graphTotalSteps)[1]}
                                id={"chart-1"}
                            />
                        </div>
                        <div className="lg:basis-1/2 flex flex-col gap-5">
                            <GraphCard
                                title="Utilisateurs actifs par challenge"
                                type="bar"
                                datas={graphNumberOfUsers}
                                labels={graphNumberOfUsersLabels}
                                max={getMaxAndStepSize(graphNumberOfUsers)[0]}
                                stepSize={
                                    getMaxAndStepSize(graphNumberOfUsers)[1]
                                }
                                id={"chart-2"}
                            />
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

export default Statistiques;
