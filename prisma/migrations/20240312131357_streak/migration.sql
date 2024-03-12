-- AlterTable
ALTER TABLE "User" ADD COLUMN     "streak" INTEGER NOT NULL DEFAULT 0;

CREATE OR REPLACE FUNCTION update_user_streak() RETURNS TRIGGER AS $$
DECLARE
    current_streak INTEGER := 0;
    max_streak INTEGER := 0;
    previous_date DATE := NULL;
    step_row RECORD;
BEGIN
    -- Calculer le streak pour cet utilisateur
    FOR step_row IN
        SELECT date_trunc('day', date) AS step_date, "Step".step_count
        FROM "Step"
        WHERE "Step".user_id = NEW.user_id
        ORDER BY date ASC
    LOOP
        -- Vérifier si la date actuelle est consécutive à la date précédente
        IF previous_date IS NULL OR step_row.step_date = previous_date + INTERVAL '1 day' THEN
            current_streak := current_streak + 1;
        ELSE
            current_streak := 1;
        END IF;

        -- Mettre à jour le maximum de la série en fonction du nombre de pas
        IF step_row.step_count >= 10000 THEN
            max_streak := GREATEST(max_streak, current_streak);
        END IF;

        previous_date := step_row.step_date;
    END LOOP;

    -- Mettre à jour le champ streak de l'utilisateur
    UPDATE "User"
    SET streak = max_streak
    WHERE id = NEW.user_id;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Créer le trigger
CREATE TRIGGER update_user_streak_trigger
AFTER INSERT ON "Step"
FOR EACH ROW
EXECUTE FUNCTION update_user_streak();