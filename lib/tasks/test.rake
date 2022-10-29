namespace :test do
  desc "generate a random name in the raketest table"
  task test_rake: :environment do
    RakeTest.generate_random_name
  end

end
