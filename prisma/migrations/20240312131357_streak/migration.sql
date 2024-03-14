-- AlterTable
ALTER TABLE "User" ADD COLUMN     "streak" INTEGER NOT NULL DEFAULT 0;

CREATE OR REPLACE FUNCTION update_user_streak() RETURNS TRIGGER AS $$
DECLARE
    current_streak INTEGER := 0;
    actual_streak INTEGER := 0;
    previous_date DATE := NULL;
    badge_id_to_add TEXT;
    step_row RECORD;
BEGIN
    -- Calculer le streak pour cet utilisateur
    FOR step_row IN
        SELECT date_trunc('day', date) AS step_date, "Step".step_count
        FROM "Step"
        WHERE "Step".user_id = NEW.user_id
            AND "Step".step_count >= 10000
        ORDER BY date ASC
    LOOP
        -- Vérifier si la date actuelle est consécutive à la date précédente
        IF previous_date IS NULL OR step_row.step_date = previous_date + INTERVAL '1 day' THEN
            current_streak := current_streak + 1;
        ELSE
            current_streak := 1;
        END IF;

        -- Mettre à jour la streak actuelle si la date des pas est la date d'hiér
        IF step_row.step_date = CURRENT_DATE - INTERVAL '1 day' THEN
            actual_streak := current_streak;
            exit;
        END IF;

        previous_date := step_row.step_date;
    END LOOP;

    -- Mettre à jour le champ streak de l'utilisateur
    UPDATE "User"
    SET streak = actual_streak
    WHERE id = NEW.user_id;

    IF actual_streak = 3 THEN
        SELECT id FROM "Badge" WHERE name = 'Série 3 jours' INTO badge_id_to_add;

        IF NOT EXISTS (SELECT * FROM "UserBadge" WHERE user_id=NEW.user_id AND "UserBadge".badge_id=badge_id_to_add) THEN
            INSERT INTO "UserBadge" (id, user_id, badge_id, challenge_id)
            VALUES (uuid_generate_v4(), NEW.user_id, badge_id_to_add, NEW.challenge_id);
        END IF;
    ELSIF actual_streak = 7 THEN
        SELECT id FROM "Badge" WHERE name = 'Série 7 jours' INTO badge_id_to_add;

        IF NOT EXISTS (SELECT * FROM "UserBadge" WHERE user_id=NEW.user_id AND "UserBadge".badge_id=badge_id_to_add) THEN
            INSERT INTO "UserBadge" (id, user_id, badge_id, challenge_id)
            VALUES (uuid_generate_v4(), NEW.user_id, badge_id_to_add, NEW.challenge_id);
        END IF;
    ELSIF actual_streak = 14 THEN
        SELECT id FROM "Badge" WHERE name = 'Série 14 jours' INTO badge_id_to_add;

        IF NOT EXISTS (SELECT * FROM "UserBadge" WHERE user_id=NEW.user_id AND "UserBadge".badge_id=badge_id_to_add) THEN
            INSERT INTO "UserBadge" (id, user_id, badge_id, challenge_id)
            VALUES (uuid_generate_v4(), NEW.user_id, badge_id_to_add, NEW.challenge_id);
        END IF;
    ELSIF actual_streak = 30 THEN
        SELECT id FROM "Badge" WHERE name = 'Série 30 jours' INTO badge_id_to_add;

        IF NOT EXISTS (SELECT * FROM "UserBadge" WHERE user_id=NEW.user_id AND "UserBadge".badge_id=badge_id_to_add) THEN
            INSERT INTO "UserBadge" (id, user_id, badge_id, challenge_id)
            VALUES (uuid_generate_v4(), NEW.user_id, badge_id_to_add, NEW.challenge_id);
        END IF;
    ELSIF actual_streak = 90 THEN
        SELECT id FROM "Badge" WHERE name = 'Série 90 jours' INTO badge_id_to_add;

        IF NOT EXISTS (SELECT * FROM "UserBadge" WHERE user_id=NEW.user_id AND "UserBadge".badge_id=badge_id_to_add) THEN
            INSERT INTO "UserBadge" (id, user_id, badge_id, challenge_id)
            VALUES (uuid_generate_v4(), NEW.user_id, badge_id_to_add, NEW.challenge_id);
        END IF;
    ELSIF actual_streak = 180 THEN
        SELECT id FROM "Badge" WHERE name = 'Série 180 jours' INTO badge_id_to_add;

        IF NOT EXISTS (SELECT * FROM "UserBadge" WHERE user_id=NEW.user_id AND "UserBadge".badge_id=badge_id_to_add) THEN
            INSERT INTO "UserBadge" (id, user_id, badge_id, challenge_id)
            VALUES (uuid_generate_v4(), NEW.user_id, badge_id_to_add, NEW.challenge_id);
        END IF;
    END IF;


    SELECT id FROM "Badge" WHERE name = CONCAT('Édition ', (SELECT extract(year FROM NEW.date)::text)) INTO badge_id_to_add;

    IF NOT EXISTS (SELECT * FROM "UserBadge" WHERE user_id=NEW.user_id AND "UserBadge".badge_id=badge_id_to_add) AND badge_id_to_add IS NOT NULL THEN
        INSERT INTO "UserBadge" (id, user_id, badge_id, challenge_id)
        VALUES (uuid_generate_v4(), NEW.user_id, badge_id_to_add, NEW.challenge_id);
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Fonction pour ajouter les badges du nombre de pas total
CREATE OR REPLACE FUNCTION update_user_total_steps_badges() RETURNS TRIGGER AS $$
DECLARE
    badge_id_to_add TEXT;
    total_steps INTEGER;
BEGIN
    SELECT SUM(step_count) as total_step FROM "Step" WHERE user_id=NEW.user_id INTO total_steps;

    IF total_steps >= 2000000 THEN
        SELECT id FROM "Badge" WHERE name = 'Badge 2M' INTO badge_id_to_add;

        IF NOT EXISTS (SELECT * FROM "UserBadge" WHERE user_id=NEW.user_id AND "UserBadge".badge_id=badge_id_to_add) THEN
            INSERT INTO "UserBadge" (id, user_id, badge_id, challenge_id)
            VALUES (uuid_generate_v4(), NEW.user_id, badge_id_to_add, NEW.challenge_id);
        END IF;
    ELSIF total_steps >= 1234567 THEN
        SELECT id FROM "Badge" WHERE name = 'Éco-Champion' INTO badge_id_to_add;

        IF NOT EXISTS (SELECT * FROM "UserBadge" WHERE user_id=NEW.user_id AND "UserBadge".badge_id=badge_id_to_add) THEN
            INSERT INTO "UserBadge" (id, user_id, badge_id, challenge_id)
            VALUES (uuid_generate_v4(), NEW.user_id, badge_id_to_add, NEW.challenge_id);
        END IF;
    ELSIF total_steps >= 617283 THEN
        SELECT id FROM "Badge" WHERE name = 'Éco-Walker engagé' INTO badge_id_to_add;

        IF NOT EXISTS (SELECT * FROM "UserBadge" WHERE user_id=NEW.user_id AND "UserBadge".badge_id=badge_id_to_add) THEN
            INSERT INTO "UserBadge" (id, user_id, badge_id, challenge_id)
            VALUES (uuid_generate_v4(), NEW.user_id, badge_id_to_add, NEW.challenge_id);
        END IF;
    ELSIF total_steps >= 500000 THEN
        SELECT id FROM "Badge" WHERE name = 'Badge 500K' INTO badge_id_to_add;

        IF NOT EXISTS (SELECT * FROM "UserBadge" WHERE user_id=NEW.user_id AND "UserBadge".badge_id=badge_id_to_add) THEN
            INSERT INTO "UserBadge" (id, user_id, badge_id, challenge_id)
            VALUES (uuid_generate_v4(), NEW.user_id, badge_id_to_add, NEW.challenge_id);
        END IF;
    ELSIF total_steps >= 308641 THEN
        SELECT id FROM "Badge" WHERE name = 'Éco-Walker débutant' INTO badge_id_to_add;

        IF NOT EXISTS (SELECT * FROM "UserBadge" WHERE user_id=NEW.user_id AND "UserBadge".badge_id=badge_id_to_add) THEN
            INSERT INTO "UserBadge" (id, user_id, badge_id, challenge_id)
            VALUES (uuid_generate_v4(), NEW.user_id, badge_id_to_add, NEW.challenge_id);
        END IF;
    ELSIF total_steps >= 250000 THEN
        SELECT id FROM "Badge" WHERE name = 'Badge 250K' INTO badge_id_to_add;

        IF NOT EXISTS (SELECT * FROM "UserBadge" WHERE user_id=NEW.user_id AND "UserBadge".badge_id=badge_id_to_add) THEN
            INSERT INTO "UserBadge" (id, user_id, badge_id, challenge_id)
            VALUES (uuid_generate_v4(), NEW.user_id, badge_id_to_add, NEW.challenge_id);
        END IF;
    ELSIF total_steps >= 100000 THEN
        SELECT id FROM "Badge" WHERE name = 'Badge 100K' INTO badge_id_to_add;

        IF NOT EXISTS (SELECT * FROM "UserBadge" WHERE user_id=NEW.user_id AND "UserBadge".badge_id=badge_id_to_add) THEN
            INSERT INTO "UserBadge" (id, user_id, badge_id, challenge_id)
            VALUES (uuid_generate_v4(), NEW.user_id, badge_id_to_add, NEW.challenge_id);
        END IF;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;


-- Créer le trigger
CREATE OR REPLACE TRIGGER update_user_streak_trigger
AFTER INSERT ON "Step"
FOR EACH ROW
EXECUTE FUNCTION update_user_streak();

CREATE OR REPLACE TRIGGER update_user_total_steps_badges_trigger
AFTER INSERT OR UPDATE ON "Step"
FOR EACH ROW
EXECUTE FUNCTION update_user_total_steps_badges();