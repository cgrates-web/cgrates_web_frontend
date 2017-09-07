require 'json'

hash = %w(API_HOST).inject({}) do |acc, v|
  acc[v] = ENV[v] unless ENV[v].nil?
  acc
end

File.open(ARGV[0], "w+") { |f| f.write hash.to_json }
