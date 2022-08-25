json.set! @activity.id do
        json.extract! @activity, :id, :title, :note, :distance, :thumb, :duration, :privacy, :starting_time
    end