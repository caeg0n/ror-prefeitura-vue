require 'test_helper'

class MensagensControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get mensagens_index_url
    assert_response :success
  end

end
