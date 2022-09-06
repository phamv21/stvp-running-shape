class Comment < ApplicationRecord
    validates :content, presence: true

    belongs_to :user
    belongs_to :activity

    def self.feed_recent_comments(activity_ids)
        sql_query = <<~SQL
            SELECT t1.activity_id, t1.id, t1.content, t1.created_at, t1.user_id, t2.username
            FROM
            (SELECT x.*
            FROM
            (SELECT comments.*, RANK()OVER(
                PARTITION BY comments.activity_id
                ORDER BY comments.created_at DESC
            ) AS rank_num
            FROM comments
            WHERE comments.activity_id IN #{'('+activity_ids.compact.join(',')+')'})AS x
            WHERE x.rank_num < 3) AS t1
            JOIN users AS t2
            ON t1.user_id = t2.id
        SQL
    
        query_result = ActiveRecord::Base.connection.execute(sql_query)
        result = Hash.new{|k,v| k[v] = []}
        query_result.each{|el| result[el['activity_id']] << el }
        result
        
    end


end
