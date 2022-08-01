# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2022_08_01_083503) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "pins", force: :cascade do |t|
    t.string "description"
    t.float "lat", null: false
    t.float "lng", null: false
    t.integer "route_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["route_id"], name: "index_pins_on_route_id"
  end

  create_table "routes", force: :cascade do |t|
    t.string "name", null: false
    t.string "description"
    t.string "privacy", default: "Public"
    t.string "activity", default: "Run"
    t.integer "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.float "distance"
    t.index ["user_id"], name: "index_routes_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "username", null: false
    t.string "email", null: false
    t.string "password_digest", null: false
    t.string "session_token"
    t.date "birthday", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "gender", default: "None"
    t.index ["email"], name: "index_users_on_email"
    t.index ["session_token"], name: "index_users_on_session_token"
    t.index ["username"], name: "index_users_on_username"
  end

end
