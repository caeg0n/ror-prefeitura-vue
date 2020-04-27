class UserChannel < ApplicationCable::Channel
  def subscribed
    stream_from "user_channel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def save_message(data)
    # Message.new(data["message"]).save
  end

  def send_message(data)
    mode = data['mode']
    site_id = data['site_id']
    user_id = data['user_id']
    status = mode    
    messages_from_me = Message.where(site_id:site_id,user_id:user_id,:status => status).order("id DESC").to_a
    messages_to_me = Message.where(site_id:site_id,to:user_id,:status => status).order("id DESC").to_a
    resp = messages_from_me + messages_to_me
    ActionCable.server.broadcast 'user_channel', data: resp
  end

end
