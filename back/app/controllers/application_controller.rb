class ApplicationController < ActionController::API
    def response_bad_request
        render status: 400, json: { status: 400, message: 'Bad Request' }
    end

    def response_not_found
        render status: 404, json: { status: 404, message: "Not Found" }
    end
end
